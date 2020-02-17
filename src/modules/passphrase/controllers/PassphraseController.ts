import { IPassphraseService } from "../../internal-types";


export default class PassphraseController {
    private readonly service: IPassphraseService;


    constructor(service: IPassphraseService) {
        this.service = service;
    }

    public run(): string {
        return this.service.run();
    }
}