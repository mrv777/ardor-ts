import { ITxSignatureService } from "../../internal-types";


export default class TxSignatureController {
    private readonly service: ITxSignatureService


    constructor(service: ITxSignatureService) {
        this.service = service;
    }


    public signBytes(unsignedTrxBytesHex: string, passphrase: string): string {
        return this.service.signBytes(unsignedTrxBytesHex, passphrase);
    }


    public verifyBytes(unsignedTrxBytesHex: string, transactionType: string, transactionJSON: object, publicKey: string): boolean {
        return this.service.verifyBytes(unsignedTrxBytesHex, transactionType, transactionJSON, publicKey);
    }

}