import { SetAccountPropertyParams, SetAccountPropertyResponse } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class SetAccountPropertyController {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: SetAccountPropertyParams): Promise<SetAccountPropertyResponse> {
        return this.service.run("setAccountProperty", url, params) as Promise<SetAccountPropertyResponse>;
    }
}