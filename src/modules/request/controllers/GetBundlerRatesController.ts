import { GetBundlerRatesParams, GetBundlerRatesResponse } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class GetBundlerRatesController {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: GetBundlerRatesParams): Promise<GetBundlerRatesResponse> {
        return this.service.run("getBundlerRates", url, params) as Promise<GetBundlerRatesResponse>;
    }
}