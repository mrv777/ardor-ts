import { ITimeConversionService } from "../../internal-types";


export default class TimeConversionService implements ITimeConversionService {

    private readonly ardorBeginTimestamp = {
        testnet: 1514296800000,
        mainnet: 1514764800000
    };


    public ardorToUnixTestnet(timestamp: number): number {
        timestamp *= 1000;
        return timestamp + this.ardorBeginTimestamp.testnet;
    }


    public ardorToUnixMainnet(timestamp: number): number {
        timestamp *= 1000;
        return timestamp + this.ardorBeginTimestamp.mainnet;
    }


    public unixToArdorTestnet(timestampInMsec: number): number {
        return Math.floor((timestampInMsec - this.ardorBeginTimestamp.testnet) / 1000);
    }


    public unixToArdorMainnet(timestampInMsec: number): number {
        return Math.floor((timestampInMsec - this.ardorBeginTimestamp.mainnet) / 1000);
    }

}