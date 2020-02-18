import * as bip39 from "bip39";
import { IPassphraseService } from "../../internal-types";


export default class Bip39Service implements IPassphraseService {

    constructor() {
        bip39.setDefaultWordlist("english");
    }


    public run(): string {
        return bip39.generateMnemonic();
    }
}