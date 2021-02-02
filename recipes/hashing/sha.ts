import { Recipe } from '../recipe';
import crypto from 'crypto';

const hashTypes = [
    'sha1', 'sha224', 'sha256', 'sha3-224', 'sha3-256', 'sha3-384',
    'sha3-512', 'sha384', 'sha512', 'sha512-224', 'sha512-256',  
] as [
    'sha1', 'sha224', 'sha256', 'sha3-224', 'sha3-256', 'sha3-384',
    'sha3-512', 'sha384', 'sha512', 'sha512-224', 'sha512-256',  
];

export type SHAHashType = typeof hashTypes[number];

export class SHAHash extends Recipe {
    text: crypto.BinaryLike = '';
    hashType: string = '';
    result: string = '';
    hash: crypto.Hash;
    digest: Buffer | null = null;

    /**
     * Create a new instance of the SHA hashing module.
     * @param text The text to hash.
     * @param hashType The type of the hash.
     */
    constructor(text: crypto.BinaryLike, hashType: SHAHashType) {
        super();

        this.text = text;
        this.hashType = hashType;
        this.hash = crypto.createHash(hashType);
    }

    /**
     * Returns the computed digest.
     */
    getDigest() {
        return this.digest;
    }

    /**
     * Compute the digest.
     */
    async roll() {
        this.hash.update(this.text);
        this.digest = this.hash.digest();

        return this.digest.toString('hex');
    }

    /**
     * This should remain unimplemented.
     */
    async unroll() {
        throw new Error('A hash function can not be unrolled');
    }
}
