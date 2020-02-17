import { ITrxSignatureService } from "../../internal-types";


export default class TrxSignatureController {
    private readonly service: ITrxSignatureService


    constructor(service: ITrxSignatureService) {
        this.service = service;
    }


    public signBytes(unsignedTrxBytesHex: string, passphrase: string): string {
        return this.service.signBytes(unsignedTrxBytesHex, passphrase);
    }


    public verifyBytes(unsignedTrxBytesHex: string, transactionType: string, transactionJSON: object, publicKey: string): boolean {
        return this.service.verifyBytes(unsignedTrxBytesHex, transactionType, transactionJSON, publicKey);
    }

}