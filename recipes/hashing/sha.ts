import crypto from 'crypto';
import {
    sha3_224,
    sha3_256,
    sha3_384,
    sha3_512,
    Hash as SHA3Hash,
    Message,
} from 'js-sha3';
import { Recipe } from '../recipe';

export const hashTypes = [
    'sha1', 'sha224', 'sha256', 'sha3-224', 'sha3-256', 'sha3-384',
    'sha3-512', 'sha384', 'sha512',
] as [
    'sha1', 'sha224', 'sha256', 'sha3-224', 'sha3-256', 'sha3-384',
    'sha3-512', 'sha384', 'sha512',
];

export type SHAHashType = typeof hashTypes[number];

const hashTypeToSHA3Handler: { [type: string]: SHA3Hash } = {
    'sha3-224': sha3_224,
    'sha3-256': sha3_256,
    'sha3-384': sha3_384,
    'sha3-512': sha3_512,
};

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

        if (this.hashType.match(/sha3-/)) {
            this.hash = crypto.createHash('sha1');
        } else {
            this.hash = crypto.createHash(hashType);
        }
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
        if (this.hashType.match(/sha3-/)) {
            const sha3Fn = hashTypeToSHA3Handler[this.hashType];
            const digest = sha3Fn.update(this.text.toString()).digest();

            this.digest = Buffer.from(digest);

            return this.digest.toString('hex');
        }

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
