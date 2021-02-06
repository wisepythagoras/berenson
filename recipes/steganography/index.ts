import StegCloak from 'stegcloak';
import { Recipe } from '../recipe';

export class Steganography extends Recipe {
    secret: string = '';
    cover: string = '';
    password: string = '';
    result: string = '';

    /**
     * Creates an instance of the text Steganography recipe.
     * @param password The password for AES-256-CTR.
     * @param cover The text to hide the secret in.
     * @param secret The text to hide.
     */
    constructor(password: string, cover: string = '', secret: string = '') {
        super();

        this.secret = secret;
        this.cover = cover;
        this.password = password;
    }

    /**
     * Hides the secret in the cover text and encrypts it with
     * a password.
     * @returns The promise that resolves with the encoded cover text.
     */
    async roll() {
        // Initialize the object for use.
        const stegcloak = new StegCloak(true, false);

        // Now hide the secret and return when it's done.
        this.result = stegcloak.hide(this.secret, this.password, this.cover);

        return this.result;
    }

    /**
     * Uncover and decrypt the secret message from within some data.
     * @return The secret message.
     */
    async unroll() {
        // Initialize the object for use.
        const stegcloak = new StegCloak(true, false);
    
        // Reveal/uncover the message and return when it's done.
        return stegcloak.reveal(this.cover, this.password);
    }
}
