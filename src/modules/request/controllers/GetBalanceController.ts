import { GetBalanceParams, GetBalanceResponse } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class GetBalanceController {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: GetBalanceParams): Promise<GetBalanceResponse> {
        return this.service.run("getBalance", url, params) as Promise<GetBalanceResponse>;
    }
}