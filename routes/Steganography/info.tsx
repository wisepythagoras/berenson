import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Subheading,
    Text,
    Divider,
} from 'react-native-paper';
import { openUrl } from '../../utils/linking';

/**
 * Renders the information page/tab for the steganography module.
 */
export const Info = () => {
    return (
        <View>
            <Subheading style={styles.header}>
                What is Steganography
            </Subheading>
            <Divider />
            <Text style={styles.text}>
                Steganography is the practice of hiding a message in plain sight.
                Text can usually be hidden in image, video, and music files.
                However, this tool not only hides it within text, but also
                encrypts it with&nbsp;
                <Text style={styles.link} onPress={openUrl('https://en.wikipedia.org/wiki/Advanced_Encryption_Standard')}>
                    AES-256-CTR
                </Text>.
            </Text>
            <Text style={styles.text}>
                The underlying project is open source and its source code is
                available on GitHub at the repository of&nbsp;
                <Text style={styles.link} onPress={openUrl('https://github.com/KuroLabs/stegcloak')}>
                    KuroLabs/stegcloak
                </Text>.
            </Text>
        </View>
    )
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
