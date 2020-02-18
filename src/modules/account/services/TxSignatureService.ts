import ardorjs from "ardorjs";
import { ITxSignatureService } from "../../internal-types";


export default class TxSignatureService implements ITxSignatureService {

    public signBytes(unsignedTrxBytesHex: string, passphrase: string): string {
        return ardorjs.signTransactionBytes(unsignedTrxBytesHex, passphrase);
    }


    public verifyBytes(unsignedTrxBytesHex: string, transactionType: string, transactionJSON: object, publicKey: string): boolean {
        return ardorjs.verifyTransactionBytes(unsignedTrxBytesHex, transactionType, transactionJSON, publicKey);
    }

}