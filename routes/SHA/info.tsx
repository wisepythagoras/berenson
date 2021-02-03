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
                The Secure Hash Algorithm (SHA for short) is a series of cryptographic hash functions
                initially designed by NIST (National Institute of Standards and Technology) but also
                developed by the NSA (National Security Agency). Notably, the NSA developed SHA1 and
                SHA2 and NIST developed SHA3.
            </Text>
            <Text style={styles.text}>
                This app uses the Node API for SHA1 and SHA2 and&nbsp;
                <Text style={styles.link} onPress={openUrl('https://github.com/emn178/js-sha3')}>
                    emn178/js-sha3
                </Text> for SHA3.
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
