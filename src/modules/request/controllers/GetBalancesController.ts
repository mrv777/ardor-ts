import { GetBalancesParams, GetBalancesResponse } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class GetBalancesController {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: GetBalancesParams): Promise<GetBalancesResponse> {
        return this.service.run("getBalances", url, params) as Promise<GetBalancesResponse>;
    }
}