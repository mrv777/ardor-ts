import { IConversionService } from "../../internal-types";


export default class ConversionController {
    private readonly service: IConversionService


    constructor(service: IConversionService) {
        this.service = service;
    }


    public idToRs(accountId: string): string {
        return this.service.idToRs(accountId);
    }


    public passphraseToPublicKey(passphrase: string, toByteArray: boolean): string | Array<number> {
        return toByteArray ? this.service.passphraseToPublicKeyBytes(passphrase)
                           : this.service.passphraseToPublicKey(passphrase);
    }


    public publicKeyToId(publicKey: string): string {
        return this.service.publicKeyToId(publicKey);
    }


    public publicKeyToRs(publicKey: string): string {
        return this.service.publicKeyToRs(publicKey);
    }


    public passphraseToId(passphrase: string): string {
        return this.service.passphraseToId(passphrase);
    }


    public passphraseToRs(passphrase: string): string {
        return this.service.passphraseToRs(passphrase);
    }
}