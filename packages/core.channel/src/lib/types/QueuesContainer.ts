import { QueueItem } from './QueueItem';

export interface QueuesContainer {
  [key: string]: QueueItem;
}
