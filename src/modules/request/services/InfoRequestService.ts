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
        // GetBalances takes chain multiple times so we must change to a string instead of an object for the parameters
        if (params.requestType == "getBalances") {
            let strVariables = '?';
            for (var p in params) {
                if (params.hasOwnProperty(p)) {
                    let variable = p;
                    if (p == "chain2" || p == "chain3" || p == "chain4" || p == "chain5") {
                        variable = "chain";
                    }
                    strVariables += variable + '=' + params[p] + '&';
                }
            }
            return axios.get(this.serviceHelper.checkUrlPrefix(url)+strVariables);
        } else {
            return axios.get(this.serviceHelper.checkUrlPrefix(url), { params });
        }
    }

}