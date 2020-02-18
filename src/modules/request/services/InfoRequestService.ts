import axios, { AxiosResponse } from "axios";
import { objectAny } from "../../../types";
import { IRequestService } from "../../internal-types";
import ServiceHelper from "./utils/ServiceHelper";


export default class InfoRequestService implements IRequestService {
    private readonly serviceHelper = new ServiceHelper();


    public async run(requestType: string, url: string, params: objectAny): Promise<objectAny> {
        params.requestType = requestType;
        return this.getRequest(url, params).then((response) => {
            return this.serviceHelper.setPromiseReturn(response.data);
        });
    }

    private async getRequest(url: string, params: objectAny): Promise<AxiosResponse<objectAny>> {
        return axios.get(this.serviceHelper.checkUrlPrefix(url), { params });
    }

}