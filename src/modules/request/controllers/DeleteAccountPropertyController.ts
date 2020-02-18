import { DeleteAccountPropertyParams, DeleteAccountPropertyResponse } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class DeleteAccountProperty {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: DeleteAccountPropertyParams): Promise<DeleteAccountPropertyResponse> {
        return this.service.run("deleteAccountProperty", url, params) as Promise<DeleteAccountPropertyResponse>;
    }
}