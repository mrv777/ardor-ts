import { GetTransactionParams, GetTransactionResponse } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class GetTransactionController {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: GetTransactionParams): Promise<GetTransactionResponse> {
        return this.service.run("getTransaction", url, params) as Promise<GetTransactionResponse>;
    }
}