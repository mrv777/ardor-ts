import { SendMoneyParams, SendMoneyResponse } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class SendMoneyController {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: SendMoneyParams): Promise<SendMoneyResponse> {
        return this.service.run("sendMoney", url, params) as Promise<SendMoneyResponse>;
    }
}