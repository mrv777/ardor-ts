import { GetBlockchainTransactionsParams, GetBlockchainTransactionsResponse } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class GetBlockchainTransactionsController {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: GetBlockchainTransactionsParams): Promise<GetBlockchainTransactionsResponse> {
        return this.service.run("getBlockchainTransactions", url, params) as Promise<GetBlockchainTransactionsResponse>;
    }
}