import lodashGet from 'lodash/get';
import Onyx from 'react-native-onyx';
import * as NetInfo from '../../NetInfo';
import * as Pusher from '../../Pusher/pusher';
import * as Network from './index';
import Log from '../../Log';
import ONYXKEYS from '../../../ONYXKEYS';

let isOffline = true;
let authToken;
let accountID;

/**
 * Refresh the offline status of the app.
 */
function refreshOfflineStatus() {
    const wasOffline = isOffline;
    if (authToken) {
        isOffline = !NetInfo.isInternetReachable() || !Pusher.isConnected() || !Pusher.isSubscribed(`private-user-accountID-${accountID}`);
    } else {
        isOffline = !NetInfo.isInternetReachable() || !Pusher.isConnected();
    }
    if (isOffline !== wasOffline) {
        Log.info(`Switching app to ${isOffline ? 'offline' : 'online'} mode`);
        Onyx.merge(ONYXKEYS.NETWORK, {isOffline});
    }
}

Network.onRefreshOfflineStatus(refreshOfflineStatus);

// TODO: expired authToken handling
Onyx.connect({
    key: ONYXKEYS.SESSION,
    callback: (val) => {
        authToken = lodashGet(val, 'authToken');
        accountID = lodashGet(val, 'accountID');
        refreshOfflineStatus();
    },
});

export {

    // Only exported for unit tests
    // eslint-disable-next-line import/prefer-default-export
    refreshOfflineStatus,
};
