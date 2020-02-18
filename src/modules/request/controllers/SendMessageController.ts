import { SendMessageParams, SendMessageResponse } from "../../../types";
import { IRequestService } from "../../internal-types";


export default class SendMessageController {
    private readonly service: IRequestService;


    constructor(service: IRequestService) {
        this.service = service;
    }


    public async run(url: string, params: SendMessageParams): Promise<SendMessageResponse> {
        return this.service.run("sendMessage", url, params) as Promise<SendMessageResponse>;
    }
}