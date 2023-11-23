import {StackCardInterpolationProps, StackNavigationOptions} from '@react-navigation/stack';
import getNavigationModalCardStyle from '@styles/getNavigationModalCardStyles';
import styles from '@styles/styles';
import variables from '@styles/variables';
import CONFIG from '@src/CONFIG';
import modalCardStyleInterpolator from './modalCardStyleInterpolator';

type ScreenOptions = Record<string, StackNavigationOptions>;

const commonScreenOptions: StackNavigationOptions = {
    headerShown: false,
    gestureDirection: 'horizontal',
    animationEnabled: true,
    cardOverlayEnabled: true,
    animationTypeForReplace: 'push',
};

const SLIDE_LEFT_OUTPUT_RANGE_MULTIPLIER = -1;

export default (isSmallScreenWidth: boolean, themeStyles: typeof styles): ScreenOptions => ({
    rightModalNavigator: {
        ...commonScreenOptions,
        cardStyleInterpolator: (props: StackCardInterpolationProps) => modalCardStyleInterpolator(isSmallScreenWidth, false, props),
        presentation: 'transparentModal',

        // We want pop in RHP since there are some flows that would work weird otherwise
        animationTypeForReplace: 'pop',
        cardStyle: {
            ...getNavigationModalCardStyle(),

            // This is necessary to cover translated sidebar with overlay.
            width: isSmallScreenWidth ? '100%' : '200%',
            // Excess space should be on the left so we need to position from right.
            right: 0,
        },
    },
    leftModalNavigator: {
        ...commonScreenOptions,
        cardStyleInterpolator: (props) => modalCardStyleInterpolator(isSmallScreenWidth, false, props, SLIDE_LEFT_OUTPUT_RANGE_MULTIPLIER),
        presentation: 'transparentModal',

        // We want pop in RHP since there are some flows that would work weird otherwise
        animationTypeForReplace: 'pop',
        cardStyle: {
            ...getNavigationModalCardStyle(),

            // This is necessary to cover translated sidebar with overlay.
            width: isSmallScreenWidth ? '100%' : '200%',

            transform: [{translateX: isSmallScreenWidth ? 0 : -variables.sideBarWidth}],
            ...(isSmallScreenWidth ? {} : styles.borderRight),
        },
    },
    homeScreen: {
        title: CONFIG.SITE_TITLE,
        ...commonScreenOptions,
        cardStyleInterpolator: (props: StackCardInterpolationProps) => modalCardStyleInterpolator(isSmallScreenWidth, false, props),

        cardStyle: {
            ...getNavigationModalCardStyle(),
            width: isSmallScreenWidth ? '100%' : variables.sideBarWidth,

            // We need to translate the sidebar to not be covered by the StackNavigator so it can be clickable.
            transform: [{translateX: isSmallScreenWidth ? 0 : -variables.sideBarWidth}],
            ...(isSmallScreenWidth ? {} : themeStyles.borderRight),
        },
    },

    fullScreen: {
        ...commonScreenOptions,
        cardStyleInterpolator: (props: StackCardInterpolationProps) => modalCardStyleInterpolator(isSmallScreenWidth, true, props),
        cardStyle: {
            ...getNavigationModalCardStyle(),

            // This is necessary to cover whole screen. Including translated sidebar.
            marginLeft: isSmallScreenWidth ? 0 : -variables.sideBarWidth,
        },
    },

    centralPaneNavigator: {
        title: CONFIG.SITE_TITLE,
        ...commonScreenOptions,
        animationEnabled: isSmallScreenWidth,
        cardStyleInterpolator: (props: StackCardInterpolationProps) => modalCardStyleInterpolator(isSmallScreenWidth, true, props),

        cardStyle: {
            ...getNavigationModalCardStyle(),
            paddingRight: isSmallScreenWidth ? 0 : variables.sideBarWidth,
        },
    },
});
