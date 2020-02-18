import { IAccountCheckService } from "../../internal-types";


export default class AccountCheckController {
    private readonly service: IAccountCheckService


    constructor(service: IAccountCheckService) {
        this.service = service;
    }


    public run(accountRs: string): boolean {
        return this.service.run(accountRs);
    }
}