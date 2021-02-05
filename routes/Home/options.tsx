export interface IOption {
    title: string
    subtitle?: string
    path: string
}

export interface IPageOption extends IOption {
    list: IOption[]
}

export const Steganography: IOption = {
    title: 'Plain-text steganography',
    subtitle: 'Hide a secret message in plain text',
    path: '/steganography',
};

export const SHA: IOption = {
    title: 'SHA',
    subtitle: 'Secure Hash Algorithm',
    path: '/hashing/sha',
};

export const BLAKE: IOption = {
    title: 'BLAKE',
    subtitle: 'BLAKE Cryptographic Hash',
    path: '/hashing/blake',
};

export const Encryption: IPageOption = {
    title: 'Encryption',
    path: '/',
    list: [
        Steganography,
    ],
};

export const Hashing: IPageOption = {
    title: 'Hashing',
    path: '/',
    list: [
        SHA,
        BLAKE,
    ],
};

export const Options: IPageOption[] = [
    Encryption,
    Hashing,
];
