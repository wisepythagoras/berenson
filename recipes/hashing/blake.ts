import crypto from 'crypto';
import blake from 'blakejs';
import { Recipe } from '../recipe';

export type BLAKEHashType = 'blake2b' | 'blake2s';

export class BLAKEHash extends Recipe {
    text: string = '';
    hashType: BLAKEHashType = '';
    result: string = '';

    /**
     * Create a new instance of the BLAKE hashing module.
     * @param text The text to hash.
     * @param hashType The type of the hash.
     */
    constructor(text: string, hashType: BLAKEHashType) {
        super();

        this.text = text;
        this.hashType = hashType;
    }

    /**
     * Compute the digest.
     */
    async roll() {
        if (this.hashType === 'blake2b') {
            return blake.blake2bHex(this.text);
        } else {
            return blake.blake2sHex(this.text);
        }
    }

    /**
     * This should remain unimplemented.
     */
    async unroll() {
        throw new Error('A hash function can not be unrolled');
    }
}
