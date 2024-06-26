import React from 'react';
import {View} from 'react-native';
import themeColors from '../../styles/themes/default';
import styles from '../../styles/styles';
import Icon from '../Icon';
import withLocalize, {withLocalizePropTypes} from '../withLocalize';
import Text from '../Text';
import * as Expensicons from '../Icon/Expensicons';
import * as Illustrations from '../Icon/Illustrations';
import variables from '../../styles/variables';

const propTypes = {
    ...withLocalizePropTypes,
};

function ExpiredValidateCodeModal(props) {
    return (
        <View style={styles.deeplinkWrapperContainer}>
            <View style={styles.deeplinkWrapperMessage}>
                <View style={styles.mb2}>
                    <Icon
                        width={variables.modalTopIconWidth}
                        height={variables.modalTopIconHeight}
                        src={Illustrations.ToddBehindCloud}
                    />
                </View>
                <Text style={[styles.textHeadline, styles.textXXLarge, styles.textAlignCenter]}>{props.translate('validateCodeModal.expiredCodeTitle')}</Text>
                <View style={[styles.mt2, styles.mb2]}>
                    <Text style={[styles.fontSizeNormal, styles.textAlignCenter]}>{props.translate('validateCodeModal.expiredCodeDescription')}</Text>
                </View>
            </View>
            <View style={styles.deeplinkWrapperFooter}>
                <Icon
                    width={variables.modalWordmarkWidth}
                    height={variables.modalWordmarkHeight}
                    fill={themeColors.success}
                    src={Expensicons.ExpensifyWordmark}
                />
            </View>
        </View>
    );
}

ExpiredValidateCodeModal.propTypes = propTypes;
ExpiredValidateCodeModal.displayName = 'ExpiredValidateCodeModal';
export default withLocalize(ExpiredValidateCodeModal);
