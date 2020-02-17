import { ITokenService } from "../../internal-types";


export default class TokenController {
    private readonly service: ITokenService


    constructor(service: ITokenService) {
        this.service = service;
    }


    public generate(message: string, passphrase: string, forTestnet: boolean): string {
        return forTestnet ? this.service.generateForTestnet(message, passphrase)
                          : this.service.generateForMainnet(message, passphrase);
    }
}