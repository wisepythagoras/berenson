import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Subheading,
    Text,
    Divider,
} from 'react-native-paper';
import { openUrl } from '../../utils/linking';

/**
 * Renders the information page/tab for the SHA module.
 */
export const Info = () => {
    return (
        <View>
            <Subheading style={styles.header}>
                What is SHA
            </Subheading>
            <Divider />
            <Text style={styles.text}>
                Info about BLAKE.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    text: {
        lineHeight: 20,
        textAlign: 'justify',
        marginTop: 10,
    },
    link: {
        textDecorationLine: 'underline',
        fontWeight: '700',
    },
});
