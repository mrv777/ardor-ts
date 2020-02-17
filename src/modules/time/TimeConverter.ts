import { ITime } from "../../types";
import TimeConversionController from "./controllers/TimeConversionController";
import TimeConversionService from "./services/TimeConversionService";


export default class TimeConverter implements ITime {

    public convertUnixToArdorTimestamp(timestampInMsec: number, isTestnetTimestamp = false): number {
        const controller = new TimeConversionController(new TimeConversionService());
        return controller.unixToArdor(timestampInMsec, isTestnetTimestamp);
    }


    public convertArdorToUnixTimestamp(timestamp: number, isTestnetTimestamp = false): number {
        const controller = new TimeConversionController(new TimeConversionService());
        return controller.ardorToUnix(timestamp, isTestnetTimestamp);
    }

}
