import { Subject } from "rxjs";

export interface QueueItem {
  subject: Subject<any>;
  info: any;
  devtools: any;
  tempData: any;
  track: boolean;
  name?: string;
  platform: string;
}
