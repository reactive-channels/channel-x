import { EmittersContainer } from '../types/EmittersContainer';
import { QueuesContainer } from '../types/QueuesContainer';
export declare const channelx: unique symbol;
export interface Broker {
    queues: QueuesContainer;
    innerQueues: QueuesContainer;
    exchanges: string[];
    emitters: EmittersContainer;
}
interface Context {
    [channelx]: ChannelX;
}
interface ChannelX {
    queues: QueuesContainer;
    emitters: EmittersContainer;
    innerQueues: QueuesContainer;
    exchanges: string[];
}
export declare function createBroker(context: Context | any): Broker;
export {};
