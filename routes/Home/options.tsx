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

export const Encryption: IPageOption = {
    title: 'Encryption',
    path: '/',
    list: [
        Steganography,
    ],
};

export const Options: IPageOption[] = [
    Encryption,
];
