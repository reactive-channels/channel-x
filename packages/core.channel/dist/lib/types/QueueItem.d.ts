import { Subject } from "rxjs";
export interface QueueItem {
    subject: Subject<any>;
    devtools?: any;
    tempData: any;
    track: boolean;
    name?: string;
    info?: any;
    platform?: string;
}
