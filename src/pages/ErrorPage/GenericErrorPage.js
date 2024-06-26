import React from 'react';
import {View} from 'react-native';
import {useErrorBoundary} from 'react-error-boundary';
import Icon from '../../components/Icon';
import defaultTheme from '../../styles/themes/default';
import * as Expensicons from '../../components/Icon/Expensicons';
import Text from '../../components/Text';
import Button from '../../components/Button';
import LogoWordmark from '../../../assets/images/expensify-wordmark.svg';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';
import * as Session from '../../libs/actions/Session';
import variables from '../../styles/variables';
import styles from '../../styles/styles';
import ErrorBodyText from './ErrorBodyText';
import TextLink from '../../components/TextLink';
import CONST from '../../CONST';
import SafeAreaConsumer from '../../components/SafeAreaConsumer';
import * as StyleUtils from '../../styles/StyleUtils';

const propTypes = {
    ...withLocalizePropTypes,
};

function GenericErrorPage({translate}) {
    const {resetBoundary} = useErrorBoundary();

    return (
        <SafeAreaConsumer>
            {({paddingBottom}) => (
                <View style={[styles.flex1, styles.pt10, styles.ph5, StyleUtils.getErrorPageContainerStyle(paddingBottom)]}>
                    <View style={[styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter]}>
                        <View>
                            <View style={styles.mb5}>
                                <Icon
                                    src={Expensicons.Bug}
                                    height={variables.componentSizeNormal}
                                    width={variables.componentSizeNormal}
                                    fill={defaultTheme.iconSuccessFill}
                                />
                            </View>
                            <View style={styles.mb5}>
                                <Text style={[styles.textHeadline]}>{translate('genericErrorPage.title')}</Text>
                            </View>
                            <View style={styles.mb5}>
                                <ErrorBodyText />
                                <Text>
                                    {`${translate('genericErrorPage.body.helpTextConcierge')} `}
                                    <TextLink
                                        href={`mailto:${CONST.EMAIL.CONCIERGE}`}
                                        style={[styles.link]}
                                    >
                                        {CONST.EMAIL.CONCIERGE}
                                    </TextLink>
                                </Text>
                            </View>
                            <View style={[styles.flexRow]}>
                                <View style={[styles.flex1, styles.flexRow]}>
                                    <Button
                                        success
                                        medium
                                        onPress={resetBoundary}
                                        text={translate('genericErrorPage.refresh')}
                                        style={styles.mr3}
                                    />
                                    <Button
                                        medium
                                        onPress={() => {
                                            Session.signOutAndRedirectToSignIn();
                                            resetBoundary();
                                        }}
                                        text={translate('initialSettingsPage.signOut')}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View styles={styles.alignSelfEnd}>
                        <View style={[styles.flex1, styles.flexRow, styles.justifyContentCenter]}>
                            <LogoWordmark
                                height={30}
                                width={80}
                                fill={defaultTheme.textLight}
                            />
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaConsumer>
    );
}

GenericErrorPage.propTypes = propTypes;
GenericErrorPage.displayName = 'ErrorPage';

export default withLocalize(GenericErrorPage);
