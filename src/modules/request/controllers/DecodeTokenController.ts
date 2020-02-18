import { DecodeTokenParams, DecodeTokenResponse, objectAny } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class DecodeTokenController {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: DecodeTokenParams): Promise<DecodeTokenResponse> {
        const _params = params as objectAny;
        _params.website = params.data;
        delete _params.data;

        return this.service.run("decodeToken", url, params) as Promise<DecodeTokenResponse>;
    }
}