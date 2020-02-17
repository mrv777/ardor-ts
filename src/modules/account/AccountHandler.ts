import { IAccount } from "../../types";
import ConversionController from "./controllers/ConversionController";
import ConversionService from "./services/ConversionService";
import TrxSignatureController from "./controllers/TrxSignatureController";
import TrxSignatureService from "./services/TrxSignatureService";
import TokenController from "./controllers/TokenController";
import TokenService from "./services/TokenService";
import AccountCheckController from "./controllers/AccountCheckController";
import AccountCheckService from "./services/AccountCheckService";


export default class AccountHandler implements IAccount {

    private readonly ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";


    public convertAccountIdToAccountRs(accountId: string): string {
        const controller = new ConversionController(new ConversionService());
        return controller.idToRs(accountId);
    }


    public convertPassphraseToPublicKey(passphrase: string, toByteArray = false): string | Array<number> {
        const controller = new ConversionController(new ConversionService());
        return controller.passphraseToPublicKey(passphrase, toByteArray);
    }


    public convertPublicKeyToAccountId(publicKey: string): string {
        const controller = new ConversionController(new ConversionService());
        return controller.publicKeyToId(publicKey);
    }


    public convertPublicKeyToAccountRs(publicKey: string): string {
        const controller = new ConversionController(new ConversionService());
        return controller.publicKeyToRs(publicKey);
    }


    public convertPassphraseToAccountId(passphrase: string): string {
        const controller = new ConversionController(new ConversionService());
        return controller.passphraseToId(passphrase);
    }


    public convertPassphraseToAccountRs(passphrase: string): string {
        const controller = new ConversionController(new ConversionService());
        return controller.passphraseToRs(passphrase);
    }


    public signTransactionBytes(unsignedTransactionBytesHex: string, passphrase: string): string {
        const controller = new TrxSignatureController(new TrxSignatureService());
        return controller.signBytes(unsignedTransactionBytesHex, passphrase);
    }


    public verifyTransactionBytes(unsignedTransactionBytesHex: string, transactionType: string, transactionJSON: object, publicKey: string): boolean {
        const controller = new TrxSignatureController(new TrxSignatureService());
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
