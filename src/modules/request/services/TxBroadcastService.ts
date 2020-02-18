import axios from "axios";
import qs from "qs";
import { objectAny } from "../../../types";
import { IRequestService } from "../../internal-types";
import ServiceHelper from "./utils/ServiceHelper";


export default class TxBroadcastService implements IRequestService {
    private readonly config = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };
    private readonly serviceHelper = new ServiceHelper();


    public async run(requestType: string, url: string, params: objectAny): Promise<objectAny> {
        params.requestType = requestType;
        return this.postRequest(url, params).then((response) => {
            return this.serviceHelper.setPromiseReturn(response.data);
        });
    }

    private async postRequest(url: string, params: objectAny): Promise<objectAny> {
        return axios.post(url, qs.stringify(params), this.config);
    }
}