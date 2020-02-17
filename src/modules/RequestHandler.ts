import axios, { AxiosResponse } from "axios";


import qs from "qs";
import {
    SendMoneyParams,
    GetBalanceParams,
    DecodeTokenParams,
    GetBlockchainTransactionsParams,
    IRequest,
    GetBundlerRatesParams,
    BroadcastTransactionParams,
    ErrorResponse,
    objectAny,
    GetBalanceResponse,
    DecodeTokenResponse,
    GetBlockchainTransactionsResponse,
    GetBundlerRatesResponse,
    SetAccountPropertyParams,
    SendMoneyResponse,
    BroadcastTransactionResponse,
    SetAccountPropertyResponse,
    DeleteAccountPropertyParams,
    DeleteAccountPropertyResponse,
    GetAccountPropertiesParams,
    GetAccountPropertiesResponse
} from "../types";
import { account } from "../index";


export default class RequestHandler implements IRequest {

    private readonly config = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };


    public async getBalance(url: string, params: GetBalanceParams): Promise<GetBalanceResponse> {
        return this.infoRequest("getBalance", url, params) as Promise<GetBalanceResponse>;
    }

    private async infoRequest(requestType: string, url: string, params: objectAny): Promise<objectAny> {
        params.requestType = requestType;
        return this.getRequest(url, params).then(response => this.setPromiseReturn(response.data));
    }

    private async getRequest(url: string, params: objectAny): Promise<AxiosResponse<objectAny>> {
        return axios.get(this.checkUrlPrefix(url), { params });
    }

    private checkUrlPrefix(url: string): string {
        return url.endsWith("/nxt") ? url : url += "/nxt";
    }

    private setPromiseReturn(responseData: objectAny): Promise<objectAny> {
        return (responseData as ErrorResponse).errorCode ? Promise.reject(responseData as ErrorResponse)
                                                         : Promise.resolve(responseData);
    }


    public async decodeToken(url: string, params: DecodeTokenParams): Promise<DecodeTokenResponse> {
        const _params = params as objectAny;
        _params.website = params.data;
        delete _params.data;

        return this.infoRequest("decodeToken", url, _params) as Promise<DecodeTokenResponse>;
    }


    public async getBlockchainTransactions(url: string, params: GetBlockchainTransactionsParams): Promise<GetBlockchainTransactionsResponse> {
        return this.infoRequest("getBlockchainTransactions", url, params) as Promise<GetBlockchainTransactionsResponse>;
    }


    public async getBundlerRates(url: string, params: GetBundlerRatesParams): Promise<GetBundlerRatesResponse> {
        return this.infoRequest("getBundlerRates", url, params) as Promise<GetBundlerRatesResponse>;
    }


    public getAccountProperties(url: string, params: GetAccountPropertiesParams): Promise<GetAccountPropertiesResponse> {
        return this.infoRequest("getAccountProperties", url, params) as Promise<GetAccountPropertiesResponse>;
    }


    public async sendMoney(url: string, params: SendMoneyParams): Promise<SendMoneyResponse> {
        return this.transactionRequest("sendMoney", url, params) as Promise<SendMoneyResponse>;
    }

    private async transactionRequest(requestType: string, url: string, params: objectAny): Promise<objectAny> {
        params.requestType = requestType;
        return this.postTransactionRequest(url, params).then(response => this.setPromiseReturn(response.data));
    }

    private async postTransactionRequest(url: string, params: objectAny): Promise<AxiosResponse<objectAny>> {
        const query = { ...params };

        delete query.requestType;
        delete query.secretPhrase;
        query.broadcast = false;
        query.publicKey = account.convertPassphraseToPublicKey(params.secretPhrase);

        url = this.checkUrlPrefix(url);


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


    public async broadcastTransaction(url: string, params: BroadcastTransactionParams): Promise<BroadcastTransactionResponse> {
        return this.broadcast(url + "?requestType=broadcastTransaction", params)
               .then(response => this.setPromiseReturn(response.data)) as Promise<BroadcastTransactionResponse>;
    }


    public async setAccountProperty(url: string, params: SetAccountPropertyParams): Promise<SetAccountPropertyResponse> {
        return this.transactionRequest("setAccountProperty", url, params) as Promise<SetAccountPropertyResponse>;
    }


    public async deleteAccountProperty(url: string, params: DeleteAccountPropertyParams): Promise<DeleteAccountPropertyResponse> {
        return this.transactionRequest("deleteAccountProperty", url, params) as Promise<DeleteAccountPropertyResponse>;
    }

}