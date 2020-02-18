import { objectAny } from "../types";

export interface IPassphraseService {
    run(): string;
}


export interface IAccountConversionService {
    idToRs(accountId: string): string;
    passphraseToPublicKey(passphrase: string): string;
    passphraseToPublicKeyBytes(passphrase: string): Array<number>;
    passphraseToRs(passphrase: string): string;
    passphraseToId(passphrase: string): string;
    publicKeyToId(publicKey: string): string;
    publicKeyToRs(publicKey: string): string;
}

export interface ITxSignatureService {
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


export interface ITimeConversionService {
    ardorToUnixTestnet(timestamp: number): number;
    ardorToUnixMainnet(timestamp: number): number;
    unixToArdorTestnet(timestampInMsec: number): number;
    unixToArdorMainnet(timestampInMsec: number): number;
}


export interface IRequestService {
    run(requestType: string, url: string, params: objectAny): Promise<objectAny>;
}
