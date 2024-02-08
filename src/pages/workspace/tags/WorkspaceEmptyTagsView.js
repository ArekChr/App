import React from 'react';
import {View} from 'react-native';
import * as Illustrations from '@components/Icon/Illustrations';
import Section from '@components/Section';
import Text from '@components/Text';
import withLocalize, {withLocalizePropTypes} from '@components/withLocalize';
import useThemeStyles from '@hooks/useThemeStyles';

function WorkspaceEmptyTagsView() {
    const styles = useThemeStyles();
    return (
        <>
            <Section
                title="You haven't created any tags"
                isCentralPane
                icon={Illustrations.Luggage}
                cardLayout="iconOnTop"
            >
                <View style={[styles.mv3]}>
                    <Text>Add a tag to track projects, locations, departments, and more.</Text>
                </View>
            </Section>
        </>
    );
}

WorkspaceEmptyTagsView.propTypes = withLocalizePropTypes;
WorkspaceEmptyTagsView.displayName = 'WorkspaceEmptyTagsView';

export default withLocalize(WorkspaceEmptyTagsView);
