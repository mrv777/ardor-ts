import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { account } from "../../..";
import { BroadcastTransactionParams, ErrorResponse, objectAny } from "../../../types";
import { IRequestService } from "../../internal-types";
import ServiceHelper from "./utils/ServiceHelper";


export default class TxRequestService implements IRequestService {
    private readonly config = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };
    private readonly serviceHelper = new ServiceHelper();


    public async run(requestType: string, url: string, params: objectAny): Promise<objectAny> {
        params.requestType = requestType;
        return this.postTransactionRequest(url, params).then((response) => {
            return this.serviceHelper.setPromiseReturn(response.data);
        });
    }

    private async postTransactionRequest(url: string, params: objectAny): Promise<objectAny> {
        const query = { ...params };

        delete query.requestType;
        delete query.secretPhrase;
        query.broadcast = false;
        query.publicKey = account.convertPassphraseToPublicKey(params.secretPhrase);

        url = this.serviceHelper.checkUrlPrefix(url);


        const response = await axios.post(url + "?requestType=" + params.requestType, qs.stringify(query), this.config);
        if ((response.data as ErrorResponse).errorCode) {
            return this.convertErrorToAxiosResponse(response.data);
        }

        const unsignedTransactionBytesHex = response.data.unsignedTransactionBytes;
        const transactionJSON = response.data.transactionJSON;

        if (!account.verifyTransactionBytes(unsignedTransactionBytesHex, transactionJSON.type, transactionJSON, query.publicKey)) {
            return this.convertErrorToAxiosResponse({ errorCode: 1001, errorDescription: "transaction verification failed" });
        }


        const signedTransactionBytesHex = account.signTransactionBytes(unsignedTransactionBytesHex, params.secretPhrase);
        return this.broadcast(url + "?requestType=broadcastTransaction", { transactionBytes: signedTransactionBytesHex, transactionJSON });
    }

    private convertErrorToAxiosResponse(error: ErrorResponse): AxiosResponse {
        return {
            data: error,
            status: 200,
            statusText: "dummy",
            headers: "dummy",
            config: {}
        };
    }

    private async broadcast(url: string, params: BroadcastTransactionParams): Promise<AxiosResponse<objectAny>> {
        return axios.post(url, qs.stringify(params), this.config);
    }
}

