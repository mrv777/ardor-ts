import { BroadcastTransactionParams, BroadcastTransactionResponse, DecodeTokenParams, DecodeTokenResponse, DeleteAccountPropertyParams, DeleteAccountPropertyResponse, GetAccountPropertiesParams, GetAccountPropertiesResponse, GetBalanceParams, GetBalanceResponse, GetBalancesParams, GetBalancesResponse, GetBlockchainTransactionsParams, GetBlockchainTransactionsResponse, GetBundlerRatesParams, GetBundlerRatesResponse, GetTransactionParams, GetTransactionResponse, IRequest, SendMessageParams, SendMessageResponse, SendMoneyParams, SendMoneyResponse, SetAccountPropertyParams, SetAccountPropertyResponse } from "../../types";
import BroadcastController from "./controllers/BroadcastController";
import DecodeTokenController from "./controllers/DecodeTokenController";
import DeleteAccountProperty from "./controllers/DeleteAccountPropertyController";
import GetAccountPropertiesController from "./controllers/GetAccountPropertiesController";
import GetBalanceController from "./controllers/GetBalanceController";
import GetBalancesController from "./controllers/GetBalancesController";
import GetBlockchainTransactionsController from "./controllers/GetBlockchainTransactionsController";
import GetBundlerRatesController from "./controllers/GetBundlerRatesController";
import GetTransactionController from "./controllers/GetTransactionController";
import SendMessageController from "./controllers/SendMessageController";
import SendMoneyController from "./controllers/SendMoneyController";
import SetAccountPropertyController from "./controllers/SetAccountPropertyController";
import InfoRequestService from "./services/InfoRequestService";
import TxBroadcastService from "./services/TxBroadcastService";
import TxRequestService from "./services/TxRequestService";


export default class RequestHandler implements IRequest {


    public async getBalance(url: string, params: GetBalanceParams): Promise<GetBalanceResponse> {
        const controller = new GetBalanceController(new InfoRequestService());
        return controller.run(url, params);
    }

    public async getBalances(url: string, params: GetBalancesParams): Promise<GetBalancesResponse> {
        const controller = new GetBalancesController(new InfoRequestService());
        return controller.run(url, params);
    }


    public async decodeToken(url: string, params: DecodeTokenParams): Promise<DecodeTokenResponse> {
        const controller = new DecodeTokenController(new InfoRequestService());
        return controller.run(url, params);
    }


    public async getBlockchainTransactions(url: string, params: GetBlockchainTransactionsParams): Promise<GetBlockchainTransactionsResponse> {
        const controller = new GetBlockchainTransactionsController(new InfoRequestService());
        return controller.run(url, params);
    }


    public async getBundlerRates(url: string, params: GetBundlerRatesParams): Promise<GetBundlerRatesResponse> {
        const controller = new GetBundlerRatesController(new InfoRequestService());
        return controller.run(url, params);
    }


    public async getAccountProperties(url: string, params: GetAccountPropertiesParams): Promise<GetAccountPropertiesResponse> {
        const controller = new GetAccountPropertiesController(new InfoRequestService());
        return controller.run(url, params);
    }


    public async getTransaction(url: string, params: GetTransactionParams): Promise<GetTransactionResponse> {
        const controller = new GetTransactionController(new InfoRequestService());
        return controller.run(url, params);
    }


    public async sendMoney(url: string, params: SendMoneyParams): Promise<SendMoneyResponse> {
        const controller = new SendMoneyController(new TxRequestService());
        return controller.run(url, params);
    }


    public async setAccountProperty(url: string, params: SetAccountPropertyParams): Promise<SetAccountPropertyResponse> {
        const controller = new SetAccountPropertyController(new TxRequestService());
        return controller.run(url, params);
    }


    public async deleteAccountProperty(url: string, params: DeleteAccountPropertyParams): Promise<DeleteAccountPropertyResponse> {
        const controller = new DeleteAccountProperty(new TxRequestService());
        return controller.run(url, params);
    }


    public async broadcastTransaction(url: string, params: BroadcastTransactionParams): Promise<BroadcastTransactionResponse> {
        const controller = new BroadcastController(new TxBroadcastService());
        return controller.run(url, params);
    }


    public async sendMessage(url: string, params: SendMessageParams): Promise<SendMessageResponse> {
        const controller = new SendMessageController(new TxRequestService());
        return controller.run(url, params);
    }

}