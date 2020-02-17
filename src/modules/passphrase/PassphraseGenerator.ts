import { IPassphrase } from "../../types";
import PassphraseController from "./controllers/PassphraseController";
import Bip39Service from "./services/Bip39Service";


export default class PassphraseGenerator implements IPassphrase {


    public generate(): string {
        const controller = new PassphraseController(new Bip39Service());
        return controller.run();
    }
}