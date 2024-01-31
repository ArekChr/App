import React, {useCallback, useEffect, useMemo, useState} from 'react';
import type {LayoutChangeEvent, NativeSyntheticEvent, StyleProp, ViewStyle} from 'react-native';
import {ActivityIndicator, PixelRatio, StyleSheet, View} from 'react-native';
import Image from '@components/Image';
import MultiGestureCanvas, {DEFAULT_ZOOM_RANGE} from '@components/MultiGestureCanvas';
import type {CanvasSize, ContentSize, OnScaleChangedCallback, ZoomRange} from '@components/MultiGestureCanvas/types';
import {getCanvasFitScale} from '@components/MultiGestureCanvas/utils';
import useStyleUtils from '@hooks/useStyleUtils';
import NUMBER_OF_CONCURRENT_LIGHTBOXES from './numberOfConcurrentLightboxes';

const DEFAULT_IMAGE_SIZE = 200;
const DEFAULT_IMAGE_DIMENSION: ContentSize = {width: DEFAULT_IMAGE_SIZE, height: DEFAULT_IMAGE_SIZE};

type ImageOnLoadEvent = NativeSyntheticEvent<ContentSize>;

const cachedImageDimensions = new Map<string, ContentSize | undefined>();

type LightboxProps = {
    /** Whether source url requires authentication */
    isAuthTokenRequired?: boolean;

    /** URI to full-sized attachment */
    uri: string;

    /** Triggers whenever the zoom scale changes */
    onScaleChanged?: OnScaleChangedCallback;

    /** Handles errors while displaying the image */
    onError?: () => void;

    /** Additional styles to add to the component */
    style?: StyleProp<ViewStyle>;

    /** The index of the carousel item */
    index?: number;

    /** The index of the currently active carousel item */
    activeIndex?: number;

    /** Whether the Lightbox is used within a carousel component and there are other sibling elements */
    hasSiblingCarouselItems?: boolean;

    /** Range of zoom that can be applied to the content by pinching or double tapping. */
    zoomRange?: Partial<ZoomRange>;
};

/**
 * On the native layer, we use a image library to handle zoom functionality
 */
function Lightbox({
    isAuthTokenRequired = false,
    uri,
    onScaleChanged,
    onError,
    style,
    index = 0,
    activeIndex = 0,
    hasSiblingCarouselItems = false,
    zoomRange = DEFAULT_ZOOM_RANGE,
}: LightboxProps) {
    const StyleUtils = useStyleUtils();

    const [canvasSize, setCanvasSize] = useState<CanvasSize>();
    const isCanvasLoading = canvasSize === undefined;
    const updateCanvasSize = useCallback(
        ({
            nativeEvent: {
                layout: {width, height},
            },
        }: LayoutChangeEvent) => setCanvasSize({width: PixelRatio.roundToNearestPixel(width), height: PixelRatio.roundToNearestPixel(height)}),
        [],
    );

    const [contentSize, setInternalContentSize] = useState<ContentSize | undefined>(() => cachedImageDimensions.get(uri));
    const setContentSize = useCallback(
        (newDimensions: ContentSize | undefined) => {
            setInternalContentSize(newDimensions);
            cachedImageDimensions.set(uri, newDimensions);
        },
        [uri],
    );
    const updateContentSize = useCallback(
        ({nativeEvent: {width, height}}: ImageOnLoadEvent) => {
            if (contentSize !== undefined) {
                return;
            }

            setContentSize({width: width * PixelRatio.get(), height: height * PixelRatio.get()});
        },
        [contentSize, setContentSize],
    );

    // Enables/disables the lightbox based on the number of concurrent lightboxes
    // On higher-end devices, we can show render lightboxes at the same time,
    // while on lower-end devices we want to only render the active carousel item as a lightbox
    // to avoid performance issues.
    const isLightboxVisible = useMemo(() => {
        if (!hasSiblingCarouselItems || NUMBER_OF_CONCURRENT_LIGHTBOXES === 'UNLIMITED') {
            return true;
        }

        const indexCanvasOffset = Math.floor((NUMBER_OF_CONCURRENT_LIGHTBOXES - 1) / 2) || 0;
        const indexOutOfRange = index > activeIndex + indexCanvasOffset || index < activeIndex - indexCanvasOffset;
        return !indexOutOfRange;
    }, [activeIndex, hasSiblingCarouselItems, index]);
    const [isLightboxImageLoaded, setLightboxImageLoaded] = useState(false);

    const [isFallbackVisible, setFallbackVisible] = useState(!isLightboxVisible);
    const [isFallbackImageLoaded, setFallbackImageLoaded] = useState(false);
    const fallbackSize = useMemo(() => {
        if (!hasSiblingCarouselItems || !contentSize || isCanvasLoading) {
            return DEFAULT_IMAGE_DIMENSION;
        }

        const {minScale} = getCanvasFitScale({canvasSize, contentSize});

        return {
            width: PixelRatio.roundToNearestPixel(contentSize.width * minScale),
            height: PixelRatio.roundToNearestPixel(contentSize.height * minScale),
        };
    }, [hasSiblingCarouselItems, contentSize, isCanvasLoading, canvasSize]);

    // If the fallback image is currently visible, we want to hide the Lightbox by setting the opacity to 0,
    // until the fallback gets hidden so that we don't see two overlapping images at the same time.
    // If there the Lightbox is not used within a carousel, we don't need to hide the Lightbox,
    // because it's only going to be rendered after the fallback image is hidden.
    const shouldShowLightbox = isLightboxImageLoaded && !isFallbackVisible;

    const isActive = index === activeIndex;
    const isFallbackStillLoading = isFallbackVisible && !isFallbackImageLoaded;
    const isLightboxStillLoading = isLightboxVisible && !isLightboxImageLoaded;
    const isLoading = isActive && (isCanvasLoading || isFallbackStillLoading || isLightboxStillLoading);

    // Resets the lightbox when it becomes inactive
    useEffect(() => {
        if (isLightboxVisible) {
            return;
        }
        setLightboxImageLoaded(false);
        setContentSize(undefined);
    }, [isLightboxVisible, setContentSize]);

    // Enables and disables the fallback image when the carousel item is active or not
    useEffect(() => {
        // When there are no other carousel items, we don't need to show the fallback image
        if (!hasSiblingCarouselItems) {
            return;
        }

        // When the carousel item is active and the lightbox has finished loading, we want to hide the fallback image
        if (isActive && isFallbackVisible && isLightboxVisible && isLightboxImageLoaded) {
            setFallbackVisible(false);
            setFallbackImageLoaded(false);
            return;
        }

        // If the carousel item has become inactive and the lightbox is not continued to be rendered, we want to show the fallback image
        if (!isActive && !isLightboxVisible) {
            setFallbackVisible(true);
        }
    }, [hasSiblingCarouselItems, isActive, isFallbackVisible, isLightboxImageLoaded, isLightboxVisible]);

    return (
        <View
            style={[StyleSheet.absoluteFill, style]}
            onLayout={updateCanvasSize}
        >
            {!isCanvasLoading && (
                <>
                    {isLightboxVisible && (
                        <View style={[StyleUtils.getFullscreenCenteredContentStyles(), StyleUtils.getOpacityStyle(Number(shouldShowLightbox))]}>
                            <MultiGestureCanvas
                                isActive={isActive}
                                onScaleChanged={onScaleChanged}
                                canvasSize={canvasSize}
                                contentSize={contentSize}
                                zoomRange={zoomRange}
                            >
                                <Image
                                    source={{uri}}
                                    style={contentSize ?? DEFAULT_IMAGE_DIMENSION}
                                    isAuthTokenRequired={isAuthTokenRequired}
                                    onError={onError}
                                    onLoad={updateContentSize}
                                    onLoadEnd={() => {
                                        setLightboxImageLoaded(true);
                                    }}
                                />
                            </MultiGestureCanvas>
                        </View>
                    )}

                    {/* Keep rendering the image without gestures as fallback if the carousel item is not active and while the lightbox is loading the image */}
                    {isFallbackVisible && (
                        <View style={StyleUtils.getFullscreenCenteredContentStyles()}>
                            <Image
                                source={{uri}}
                                resizeMode="contain"
                                style={fallbackSize}
                                isAuthTokenRequired={isAuthTokenRequired}
                                onLoad={updateContentSize}
                                onLoadEnd={() => setFallbackImageLoaded(true)}
                            />
                        </View>
                    )}

                    {/* Show activity indicator while the lightbox is still loading the image. */}
                    {isLoading && (
                        <ActivityIndicator
                            size="large"
                            style={StyleSheet.absoluteFill}
                        />
                    )}
                </>
            )}
        </View>
    );
}

Lightbox.displayName = 'Lightbox';

export default Lightbox;