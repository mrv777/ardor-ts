import { GetAccountPropertiesParams, GetAccountPropertiesResponse } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class GetAccountPropertiesController {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: GetAccountPropertiesParams): Promise<GetAccountPropertiesResponse> {
        return this.service.run("getAccountProperties", url, params) as Promise<GetAccountPropertiesResponse>;
    }
}