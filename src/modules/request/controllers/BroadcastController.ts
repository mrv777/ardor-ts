import { BroadcastTransactionParams, BroadcastTransactionResponse } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class BroadcastController {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: BroadcastTransactionParams): Promise<BroadcastTransactionResponse> {
        return this.service.run("broadcastTransaction", url, params) as Promise<BroadcastTransactionResponse>;
    }
}