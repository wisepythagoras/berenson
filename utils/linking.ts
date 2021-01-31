import { Linking } from 'react-native';

/**
 * Attempts to open a given url in the system's web browser.
 * @param url The url to attempt to open.
 * @returns The handler function.
 */
export const openUrl = (url: string) => {
    return async () => {
        try {
            await Linking.openURL(url);
        } catch (e) {
            alert(e);
        }
    };
};
