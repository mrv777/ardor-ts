export interface IPassphraseService {
    run(): string;
}


export interface IConversionService {
    idToRs(accountId: string): string;
    passphraseToPublicKey(passphrase: string): string;
    passphraseToPublicKeyBytes(passphrase: string): Array<number>;
    passphraseToRs(passphrase: string): string;
    passphraseToId(passphrase: string): string;
    publicKeyToId(publicKey: string): string;
    publicKeyToRs(publicKey: string): string;
}


export interface ITrxSignatureService {
    signBytes(unsignedTrxBytesHex: string, passphrase: string): string;
    verifyBytes(unsignedTrxBytesHex: string, transactionType: string, transactionJSON: object, publicKey: string): boolean;
}


export interface ITokenService {
    generateForTestnet(message: string, passphrase: string): string;
    generateForMainnet(message: string, passphrase: string): string;
}


export interface IAccountCheckService {
    run(accountRs: string): boolean;
}