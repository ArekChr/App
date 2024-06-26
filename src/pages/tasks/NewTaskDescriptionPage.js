import React, {useRef, useCallback} from 'react';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import {useFocusEffect} from '@react-navigation/native';
import PropTypes from 'prop-types';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';
import compose from '../../libs/compose';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import Navigation from '../../libs/Navigation/Navigation';
import ScreenWrapper from '../../components/ScreenWrapper';
import styles from '../../styles/styles';
import ONYXKEYS from '../../ONYXKEYS';
import Form from '../../components/Form';
import TextInput from '../../components/TextInput';
import Permissions from '../../libs/Permissions';
import ROUTES from '../../ROUTES';
import * as Task from '../../libs/actions/Task';
import updateMultilineInputRange from '../../libs/UpdateMultilineInputRange';
import CONST from '../../CONST';
import * as Browser from '../../libs/Browser';

const propTypes = {
    /** Beta features list */
    betas: PropTypes.arrayOf(PropTypes.string),

    /** Grab the Share description of the Task */
    task: PropTypes.shape({
        /** Description of the Task */
        description: PropTypes.string,
    }),

    ...withLocalizePropTypes,
};

const defaultProps = {
    betas: [],
    task: {
        description: '',
    },
};

function NewTaskDescriptionPage(props) {
    const inputRef = useRef(null);
    const focusTimeoutRef = useRef(null);
    // On submit, we want to call the assignTask function and wait to validate
    // the response

    useFocusEffect(
        useCallback(() => {
            focusTimeoutRef.current = setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
                return () => {
                    if (!focusTimeoutRef.current) {
                        return;
                    }
                    clearTimeout(focusTimeoutRef.current);
                };
            }, CONST.ANIMATED_TRANSITION);
        }, []),
    );

    const onSubmit = (values) => {
        Task.setDescriptionValue(values.taskDescription);
        Navigation.goBack(ROUTES.NEW_TASK);
    };

    if (!Permissions.canUseTasks(props.betas)) {
        Navigation.dismissModal();
        return null;
    }
    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}
            shouldEnableMaxHeight
            testID={NewTaskDescriptionPage.displayName}
        >
            <>
                <HeaderWithBackButton
                    title={props.translate('task.description')}
                    onCloseButtonPress={() => Task.dismissModalAndClearOutTaskInfo()}
                    onBackButtonPress={() => Navigation.goBack(ROUTES.NEW_TASK)}
                />
                <Form
                    formID={ONYXKEYS.FORMS.NEW_TASK_FORM}
                    submitButtonText={props.translate('common.next')}
                    style={[styles.mh5, styles.flexGrow1]}
                    onSubmit={(values) => onSubmit(values)}
                    enabledWhenOffline
                >
                    <View style={styles.mb5}>
                        <TextInput
                            defaultValue={props.task.description}
                            inputID="taskDescription"
                            label={props.translate('newTaskPage.descriptionOptional')}
                            accessibilityLabel={props.translate('newTaskPage.descriptionOptional')}
                            accessibilityRole={CONST.ACCESSIBILITY_ROLE.TEXT}
                            ref={(el) => {
                                if (!el) {
                                    return;
                                }
                                inputRef.current = el;
                                updateMultilineInputRange(inputRef.current);
                            }}
                            autoGrowHeight
                            submitOnEnter={!Browser.isMobile()}
                            containerStyles={[styles.autoGrowHeightMultilineInput]}
                            textAlignVertical="top"
                        />
                    </View>
                </Form>
            </>
        </ScreenWrapper>
    );
}

NewTaskDescriptionPage.displayName = 'NewTaskDescriptionPage';
NewTaskDescriptionPage.propTypes = propTypes;
NewTaskDescriptionPage.defaultProps = defaultProps;

export default compose(
    withOnyx({
        betas: {
            key: ONYXKEYS.BETAS,
        },
        task: {
            key: ONYXKEYS.TASK,
        },
    }),
    withLocalize,
)(NewTaskDescriptionPage);
