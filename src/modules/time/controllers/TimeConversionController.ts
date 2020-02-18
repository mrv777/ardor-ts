import { ITimeConversionService } from "../../internal-types";


export default class TimeConversionController {
    private readonly service: ITimeConversionService


    constructor(service: ITimeConversionService) {
        this.service = service;
    }


    public unixToArdor(timestampInMsec: number, isTestnetTimestamp: boolean): number {
        return isTestnetTimestamp ? this.service.unixToArdorTestnet(timestampInMsec)
                                  : this.service.unixToArdorMainnet(timestampInMsec);
    }


    public ardorToUnix(timestamp: number, isTestnetTimestamp: boolean): number {
        return isTestnetTimestamp ? this.service.ardorToUnixTestnet(timestamp)
                                  : this.service.ardorToUnixMainnet(timestamp);
    }

}