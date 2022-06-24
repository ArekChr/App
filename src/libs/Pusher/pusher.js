import _ from 'underscore';
import CONST from '../../CONST';
import Pusher from './library';
import TYPE from './EventType';
import Log from '../Log';
import * as Network from '../actions/Network';

let socket;
const socketEventCallbacks = [];
let customAuthorizer;
let pusherInitializedPromise;

/**
 * Trigger each of the socket event callbacks with the event information
 *
 * @param {String} eventName
 * @param {*} data
 */
function callSocketEventCallbacks(eventName, data) {
    _.each(socketEventCallbacks, cb => cb(eventName, data));
}

/**
 * Initialize our pusher lib
 *
 * @param {Object} args
 * @param {String} args.appKey
 * @param {String} args.cluster
 * @param {String} args.authEndpoint
 * @param {Object} [params]
 * @public
 */
function init(args, params) {
    pusherInitializedPromise = new Promise((resolve) => {
        if (socket) {
            return resolve();
        }

        // Use this for debugging
        // Pusher.log = (message) => {
        //     if (window.console && window.console.log) {
        //         window.console.log(message);
        //     }
        // };

        const options = {
            cluster: args.cluster,
            authEndpoint: args.authEndpoint,
        };

        if (customAuthorizer) {
            options.authorizer = customAuthorizer;
        }

        socket = new Pusher(args.appKey, options);

        // If we want to pass params in our requests to api.php we'll need to add it to socket.config.auth.params
        // as per the documentation
        // (https://pusher.com/docs/channels/using_channels/connection#channels-options-parameter).
        // Any param mentioned here will show up in $_REQUEST when we call "Push_Authenticate". Params passed here need
        // to pass our inputRules to show up in the request.
        if (params) {
            socket.config.auth = {};
            socket.config.auth.params = params;
        }

        // Listen for connection errors and log them
        socket.connection.bind('error', (error) => {
            callSocketEventCallbacks('error', error);
        });

        socket.connection.bind('connected', () => {
            callSocketEventCallbacks('connected');
            resolve();
        });

        socket.connection.bind('disconnected', () => {
            callSocketEventCallbacks('disconnected');
        });

        socket.connection.bind('state_change', (states) => {
            callSocketEventCallbacks('state_change', states);
            Network.refreshOfflineStatus();
        });
    });
}

/**
 * Get the Pusher connection. Used only in tests to access the Pusher mock.
 *
 * @returns {Object}
 */
function getSocket() {
    if (process.env.JEST_WORKER_ID === undefined) {
        throw new Error('Pusher.getConnection can only be used by Jest to access the mock');
    }
    return socket;
}

/**
 * Returns a Pusher channel for a channel name
 *
 * @param {String} channelName
 *
 * @returns {Channel}
 */
function getChannel(channelName) {
    if (!socket) {
        return;
    }

    return socket.channel(channelName);
}

/**
 * Binds an event callback to a channel + eventName
 * @param {Pusher.Channel} channel
 * @param {String} eventName
 * @param {Function} [eventCallback]
 *
 * @private
 */
function bindEventToChannel(channel, eventName, eventCallback = () => {}) {
    if (!eventName) {
        return;
    }

    const chunkedDataEvents = {};
    const callback = (eventData) => {
        let data;
        try {
            data = _.isObject(eventData) ? eventData : JSON.parse(eventData);
        } catch (err) {
            Log.alert('[Pusher] Unable to parse JSON response from Pusher', {error: err, eventData});
            return;
        }
        if (data.id === undefined || data.chunk === undefined || data.final === undefined) {
            eventCallback(data);
            return;
        }

        // If we are chunking the requests, we need to construct a rolling list of all packets that have come through
        // Pusher. If we've completed one of these full packets, we'll combine the data and act on the event that it's
        // assigned to.

        // If we haven't seen this eventID yet, initialize it into our rolling list of packets.
        if (!chunkedDataEvents[data.id]) {
            chunkedDataEvents[data.id] = {chunks: [], receivedFinal: false};
        }

        // Add it to the rolling list.
        const chunkedEvent = chunkedDataEvents[data.id];
        chunkedEvent.chunks[data.index] = data.chunk;

        // If this is the last packet, mark that we've hit the end.
        if (data.final) {
            chunkedEvent.receivedFinal = true;
        }

        // Only call the event callback if we've received the last packet and we don't have any holes in the complete
        // packet.
        if (chunkedEvent.receivedFinal && chunkedEvent.chunks.length === _.keys(chunkedEvent.chunks).length) {
            eventCallback(JSON.parse(chunkedEvent.chunks.join('')));
            try {
                eventCallback(JSON.parse(chunkedEvent.chunks.join('')));
            } catch (err) {
                Log.alert('[Pusher] Unable to parse chunked JSON response from Pusher', {
                    error: err,
                    eventData: chunkedEvent.chunks.join(''),
                });
            }

            delete chunkedDataEvents[data.id];
        }
    };

    channel.bind(eventName, callback);
}

/**
 * Subscribe to a channel and an event
 *
 * @param {String} channelName
 * @param {String} eventName
 * @param {Function} [eventCallback]
 *
 * @return {Promise}
 *
 * @public
 */
function subscribe(
    channelName,
    eventName,
    eventCallback = () => {},
) {
    return pusherInitializedPromise
        .then(() => new Promise((resolve, reject) => {
            // If we get here, the socket should be initialized. If not, throw an error so we notice on dev
            if (!socket) {
                throw new Error(`[Pusher] instance not found. Pusher.subscribe()
                most likely has been called before Pusher.init()`);
            }

            Log.info('[Pusher] Attempting to subscribe to channel', false, {channelName, eventName});
            let channel = getChannel(channelName);
            const isPrivateUserChannel = /private-user-accountID-\d/.test(channelName);

            if (!channel || !channel.subscribed) {
                channel = socket.subscribe(channelName);
                let isBound = false;
                channel.bind('pusher:subscription_succeeded', () => {
                    if (isPrivateUserChannel) {
                        Network.refreshOfflineStatus();
                    }

                    // Check so that we do not bind another event with each reconnect attempt
                    if (!isBound) {
                        bindEventToChannel(channel, eventName, eventCallback);
                        resolve();
                        isBound = true;
                    }
                });

                channel.bind('pusher:subscription_error', (data = {}) => {
                    const {type, error, status} = data;
                    Log.hmmm('[Pusher] Issue authenticating with Pusher during subscribe attempt.', {
                        channelName,
                        status,
                        type,
                        error,
                    });

                    if (isPrivateUserChannel) {
                        Network.refreshOfflineStatus();
                    }

                    reject(error);
                });
            } else {
                bindEventToChannel(channel, eventName, eventCallback);
                resolve();
            }
        }));
}

/**
 * Unsubscribe from a channel and optionally a specific event
 *
 * @param {String} channelName
 * @param {String} [eventName]
 * @public
 */
function unsubscribe(channelName, eventName = '') {
    const channel = getChannel(channelName);

    if (!channel) {
        Log.hmmm('[Pusher] Attempted to unsubscribe or unbind from a channel, but Pusher-JS has no knowledge of it', {channelName, eventName});
        return;
    }

    if (eventName) {
        Log.info('[Pusher] Unbinding event', false, {eventName, channelName});
        channel.unbind(eventName);
    } else {
        if (!channel.subscribed) {
            Log.info('Pusher] Attempted to unsubscribe from channel, but we are not subscribed to begin with', false, {channelName});
            return;
        }
        Log.info('[Pusher] Unsubscribing from channel', false, {channelName});

        channel.unbind();
        socket.unsubscribe(channelName);

        if (/private-user-accountID-\d/.test(channelName)) {
            Network.refreshOfflineStatus();
        }
    }
}

/**
 * Do we have an active websocket connection to the Pusher service?
 *
 * @returns {Boolean}
 */
function isConnected() {
    if (!socket) {
        return false;
    }

    return socket.connection.state === CONST.PUSHER.STATE.CONNECTED;
}

/**
 * Are we already in the process of subscribing to this channel?
 *
 * @param {String} channelName
 *
 * @returns {Boolean}
 */
function isAlreadySubscribing(channelName) {
    if (!socket) {
        return false;
    }

    const channel = getChannel(channelName);
    return channel ? channel.subscriptionPending : false;
}

/**
 * Are we already subscribed to this channel?
 *
 * @param {String} channelName
 *
 * @returns {Boolean}
 */
function isSubscribed(channelName) {
    if (!socket) {
        return false;
    }

    const channel = getChannel(channelName);
    return channel ? channel.subscribed : false;
}

/**
 * Sends an event over a specific event/channel in pusher.
 *
 * @param {String} channelName
 * @param {String} eventName
 * @param {Object} payload
 */
function sendEvent(channelName, eventName, payload) {
    // Check to see if we are subscribed to this channel before sending the event. Sending client events over channels
    // we are not subscribed too will throw errors and cause reconnection attempts. Subscriptions are not instant and
    // can happen later than we expect.
    if (!isSubscribed(channelName)) {
        return;
    }

    socket.send_event(eventName, payload, channelName);
}

/**
 * Register a method that will be triggered when a socket event happens (like disconnecting)
 *
 * @param {Function} cb
 */
function registerSocketEventCallback(cb) {
    socketEventCallbacks.push(cb);
}

/**
 * A custom authorizer allows us to take a more fine-grained approach to
 * authenticating Pusher. e.g. we can handle failed attempts to authorize
 * with an expired authToken and retry the attempt.
 *
 * @param {Function} authorizer
 */
function registerCustomAuthorizer(authorizer) {
    customAuthorizer = authorizer;
}

/**
 * Disconnect and Re-Connect Pusher
 */
function reconnect() {
    if (!socket) {
        Log.info('[Pusher] Unable to reconnect since Pusher instance does not yet exist.');
        return;
    }

    Log.info('[Pusher] Reconnecting to Pusher');
    socket.disconnect();
    socket.connect();
}

if (window) {
    /**
     * Pusher socket for debugging purposes
     *
     * @returns {Function}
     */
    window.getPusherInstance = () => socket;
}

export {
    init,
    getSocket,
    subscribe,
    unsubscribe,
    getChannel,
    isConnected,
    isSubscribed,
    isAlreadySubscribing,
    sendEvent,
    reconnect,
    registerSocketEventCallback,
    registerCustomAuthorizer,
    TYPE,
};
