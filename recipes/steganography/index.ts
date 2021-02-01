import StegCloak from 'stegcloak';

/**
 * Hides the secret in the cover text and encrypts it with
 * a password.
 * @param secret The secret message to hide.
 * @param cover The text that will be used to hide the secret in.
 * @param password The password that will be used to run AES-256-CTR with.
 * @returns The promise that resolves with the encoded cover text.
 */
export const roll = async (secret: string, cover: string, password: string) => {
    // Initialize the object for use.
    const stegcloak = new StegCloak(true, false);

    // Now hide the secret and return when it's done.
    return stegcloak.hide(secret, password, cover);
};

/**
 * Uncover and decrypt the secret message from within some data.
 * @param data The encoded cover text.
 * @param password The password to decrypt the hidden message with.
 * @return The secret message.
 */
export const unroll = async (data: string, password: string) => {
    // Initialize the object for use.
    const stegcloak = new StegCloak(true, false);

    // Reveal/uncover the message and return when it's done.
    return stegcloak.reveal(data, password);
};
