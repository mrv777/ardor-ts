import { IAccountCheckService } from "../../internal-types";


export default class AccountCheckService implements IAccountCheckService {
    private readonly ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";


    public run(accountRs: string): boolean {
        return this.checkAccountRs(accountRs);
    }

    private checkAccountRs(accountRs: string): boolean {
        const accountPrefix = "ARDOR-";
        if (!accountRs.startsWith(accountPrefix)) {
            return false;
        }

        const subAccount = accountRs.substring(accountPrefix.length);
        const subAccountFields = subAccount.split("-");

        if (subAccountFields.length !== 4) {
            return false;
        }
        if (subAccountFields[0].length !== 4) {
            return false;
        }
        if (subAccountFields[1].length !== 4) {
            return false;
        }
        if (subAccountFields[2].length !== 4) {
            return false;
        }
        if (subAccountFields[3].length !== 5) {
            return false;
        }

        if (!this.checkCharacter(subAccountFields[0].split(""))) {
            return false;
        }
        if (!this.checkCharacter(subAccountFields[1].split(""))) {
            return false;
        }
        if (!this.checkCharacter(subAccountFields[2].split(""))) {
            return false;
        }
        if (!this.checkCharacter(subAccountFields[3].split(""))) {
            return false;
        }

        return true;
    }

    private checkCharacter(characters: string[]): boolean {
        let containsWrongCharacter = false;

        characters.forEach((character) => {
            if (!this.ALPHABET.includes(character)) {
                containsWrongCharacter = true;
                return;
            }
        });

        return !containsWrongCharacter;
    }
}