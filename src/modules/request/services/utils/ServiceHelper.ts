import { ErrorResponse, objectAny } from "../../../../types";


export default class ServiceHelper {

    public checkUrlPrefix(url: string): string {
        return url.endsWith("/nxt") ? url : url += "/nxt";
    }

    public setPromiseReturn(responseData: objectAny): Promise<objectAny> {
        return (responseData as ErrorResponse).errorCode ? Promise.reject(responseData as ErrorResponse)
                                                         : Promise.resolve(responseData);
    }
}