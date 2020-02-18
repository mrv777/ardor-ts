import { IAccount } from "../../types";
import AccountCheckController from "./controllers/AccountCheckController";
import AccountConversionController from "./controllers/AccountConversionController";
import TokenController from "./controllers/TokenController";
import TxSignatureController from "./controllers/TxSignatureController";
import AccountCheckService from "./services/AccountCheckService";
import AccountConversionService from "./services/AccountConversionService";
import TokenService from "./services/TokenService";
import TxSignatureService from "./services/TxSignatureService";


export default class AccountHandler implements IAccount {

    public convertAccountIdToAccountRs(accountId: string): string {
        const controller = new AccountConversionController(new AccountConversionService());
        return controller.idToRs(accountId);
    }


    public convertPassphraseToPublicKey(passphrase: string, toByteArray = false): string | Array<number> {
        const controller = new AccountConversionController(new AccountConversionService());
        return controller.passphraseToPublicKey(passphrase, toByteArray);
    }


    public convertPublicKeyToAccountId(publicKey: string): string {
        const controller = new AccountConversionController(new AccountConversionService());
        return controller.publicKeyToId(publicKey);
    }


    public convertPublicKeyToAccountRs(publicKey: string): string {
        const controller = new AccountConversionController(new AccountConversionService());
        return controller.publicKeyToRs(publicKey);
    }


    public convertPassphraseToAccountId(passphrase: string): string {
        const controller = new AccountConversionController(new AccountConversionService());
        return controller.passphraseToId(passphrase);
    }


    public convertPassphraseToAccountRs(passphrase: string): string {
        const controller = new AccountConversionController(new AccountConversionService());
        return controller.passphraseToRs(passphrase);
    }


    public signTransactionBytes(unsignedTransactionBytesHex: string, passphrase: string): string {
        const controller = new TxSignatureController(new TxSignatureService());
        return controller.signBytes(unsignedTransactionBytesHex, passphrase);
    }


    public verifyTransactionBytes(unsignedTransactionBytesHex: string, transactionType: string, transactionJSON: object, publicKey: string): boolean {
        const controller = new TxSignatureController(new TxSignatureService());
        return controller.verifyBytes(unsignedTransactionBytesHex, transactionType, transactionJSON, publicKey);
    }


    public generateToken(message: string, passphrase: string, forTestnet = false): string {
        const controller = new TokenController(new TokenService());
        return controller.generate(message, passphrase, forTestnet);
    }


    public checkAccountRs(accountRs: string): boolean {
        const controller = new AccountCheckController(new AccountCheckService());
        return controller.run(accountRs);
    }

}
