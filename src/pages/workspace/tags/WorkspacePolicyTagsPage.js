import React, {useState} from 'react';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import ButtonWithDropdownMenu from '@components/ButtonWithDropdownMenu';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import SelectionList from '@components/SelectionList';
import Text from '@components/Text';
import withLocalize from '@components/withLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import compose from '@libs/compose';
import WorkspacePageWithSections from '@pages/workspace/WorkspacePageWithSections';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import WorkspaceEmptyTagsView from './WorkspaceEmptyTagsView';

function WorkspacePolicyTagsPage({policyTags, translate, route, ...rest}) {
    const styles = useThemeStyles();

    const [tags, setTags] = useState(
        [
            {name: 'Alice Co.', enabled: true},
            {name: 'Bob Ltd.', enabled: false},
            {name: 'Cathly Plc.', enabled: false},
            {name: 'Ethan Eatery', enabled: false},
            {name: 'Freddy Fraps', enabled: false},
            {name: 'Greg Gardening', enabled: false},
            {name: 'Hazel HOmes', enabled: false},
        ].map((tag) => ({
            value: tag.name,
            text: tag.name,
            keyForList: tag.name,
            isSelected: false,
            rightElement: (
                <View style={styles.row}>
                    <Text>{tag.enabled ? 'Enabled' : 'Disabled'}</Text>
                    <Icon src={Expensicons.ArrowRight} />
                </View>
            ),
        })),
    );

    const hasTags = tags.length > 0;

    const onSelectTag = (item) => {
        setTags((prev) =>
            prev.map((tag) => {
                if (tag.value === item.value) {
                    return {
                        ...tag,
                        isSelected: !tag.isSelected,
                    };
                }
                return tag;
            }),
        );
    };

    const onSelectAllTags = () => {
        const allSelected = tags.every((tag) => tag.isSelected);
        if (allSelected) {
            setTags((prev) => prev.map((tag) => ({...tag, isSelected: false})));
        } else {
            setTags((prev) => prev.map((tag) => ({...tag, isSelected: true})));
        }
    };

    const onDropdownMenuSelect = (value) => {
        const selectedTags = tags.filter((tag) => tag.isSelected);
        switch (value) {
            case 'delete':
                // TODO:
                break;
            case 'disable':
                // TODO:
                break;
            case 'enable':
                // TODO:
                break;
            default:
                break;
        }
    };

    return (
        <WorkspacePageWithSections
            shouldUseScrollView
            headerText={translate('workspace.common.tags')}
            route={route}
            shouldShowOfflineIndicatorInWideScreen
            rightComponent={() => (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ButtonWithDropdownMenu
                        buttonSize={CONST.DROPDOWN_BUTTON_SIZE.MEDIUM}
                        menuHeaderText={`${tags.filter((tag) => tag.isSelected).length} selected`}
                        onOptionSelected={({value}) => onDropdownMenuSelect(value)}
                        options={[
                            {
                                text: 'Delete tags',
                                icon: Expensicons.Trashcan,
                                value: 'delete',
                            },
                            {
                                text: 'Disable tags',
                                icon: Expensicons.Document,
                                value: 'disable',
                            },
                            {
                                text: 'Enable tags',
                                icon: Expensicons.Document,
                                value: 'enable',
                            },
                        ]}
                    />
                </View>
            )}
        >
            {() => (
                <>
                    {!hasTags && <WorkspaceEmptyTagsView />}
                    {hasTags && (
                        <SelectionList
                            onSelectRow={onSelectTag}
                            onSelectAll={onSelectAllTags}
                            canSelectMultiple
                            sections={[{data: tags}]}
                        />
                    )}
                </>
            )}
        </WorkspacePageWithSections>
    );
}

export default compose(
    withLocalize,
    withOnyx({
        policyTags: {
            key: ({
                route: {
                    params: {policyID},
                },
            }) => `${ONYXKEYS.COLLECTION.POLICY_TAGS}${'policy_' + (policyID || '0')}`,
        },
    }),
)(WorkspacePolicyTagsPage);
