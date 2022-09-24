import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { skipWhile } from "rxjs/operators";
import { Broker, createBroker } from "./broker/broker";
import { fetchRequest } from "./internal/fetchRequest";
import { isEmpty } from "./internal/isEmpty";
import { setHttpInfo } from "./internal/setEndPoint";
import { DataType } from "./types/DataType";
import { EmittersContainer } from "./types/EmittersContainer";
import { Endpoint } from "./types/Endpoint";
import { ExchangeType } from "./types/ExchangeType";
import { HttpInfo } from "./types/HttpInfo";
import { QueueItem } from "./types/QueueItem";
import { QueuesContainer } from "./types/QueuesContainer";
import { SubjectOptions } from "./utils/rx.utils";
export interface Todo {
  title: string;
}
export class Channel {
  private static readonly INIT_VALUE = `INIT_VALUE${new Date().valueOf()}`;
  // private static readonly INIT_VALUE = Symbol('INIT_VALUE');

  protected static readonly _queues: QueuesContainer = {} as QueuesContainer;
  // protected static get queues() {
  //   return Channel._queues;
  // }

  public static publishTo(queueName: string, msg: any) {
    if (Channel.broker.queues[queueName]) {
      Channel.broker.queues[queueName].subject.next(msg);
    }
  }

  public static consumeFrom(queueName: string) {
    return Channel.broker.queues[queueName]?.subject;
  }

  // protected static queues = new Proxy(this._queues, this.queuesHandler);
  protected static broker: Broker = createBroker(globalThis);

  private static readonly exchanges: { [key: string]: string[] } = {};

  private options: any;
  // protected static get exchanges() {
  //   return Channel._exchanges;
  // }
  // protected static set exchanges(queueName:string) {
  //   Channel._exchanges[]

  // }

  // public static useFromSubject(subject: Subject<any>, queueName: string) {
  //   // dosnt work yet
  //   return new Channel(queueName, subject);
  // }

  // public static useFromStream(subject: ReplaySubject<any>, queueName: string) {
  //   //const channel = Channel.use(queueName);
  //   const channel = new Channel(queueName, subject);
  //   // subject.subscribe((x: any) => {
  //   //   console.log('x', x);
  //   //   Channel.broker.queues[queueName].subject.next(x);
  //   // });
  //   // Channel.broker.queues[queueName].subject.next({});
  //   return channel;
  // }

  public static get settings() {
    return {
      broker: Channel.broker,
      context: Channel.context,
    };
  }
  private static context: any[] = [];

  private static refs = new Map();

  protected queueName: string;

  private queueContext: any;

  private subscriptions: any[] = [];

  protected operators: any;
  private builders: any = {};
  //private builders: Map<string, VoidFunction> = new Map();
  public scope(context: any) {
    Channel.context.push(context);
    return this;
  }
  private tempData: any;
  protected queues!: QueuesContainer;
  protected emitters!: EmittersContainer;
  private exchangeName = "default";

  private exchangeType: ExchangeType = ExchangeType.fanout;

  private httpInfo: HttpInfo = { url: "", func: null } as HttpInfo;

  public static use(queueName: string, options?: any): Channel {
    return new Channel(
      queueName,
      // new BehaviorSubject(this.subjectOptions.INIT_VALUE),
      new ReplaySubject(20),
      options
    );
  }

  public static useReplay(queueName: string, options?: any) {
    return new Channel(queueName, new ReplaySubject(20), options);
  }

  public static innerUse(queueName: string, options?: any) {
    return new Channel(queueName, new ReplaySubject(20), {
      ...options,
      ...{ inner: true },
    });
  }

  // public setQueueInfo(queueName: string, info: any, key: string) {
  //   Channel.queues[queueName].info = { components: { [key]: info } };
  // }

  public stash<T>(msg: T, type: DataType = DataType.TEXT, override = true) {
    const queue = this.queues[this.queueName];
    switch (type) {
      case DataType.TEXT:
        override ? (queue.tempData = msg) : (queue.tempData += msg);
    }
  }
  public stashAndPublishWhen() {
    return "";
  }
  public flushAndPublish() {
    const queue = this.queues[this.queueName];
    const data = queue?.tempData;
    if (data !== undefined) {
      this.publish(data, () => (queue.tempData = ""));
    }
  }
  public context(context: any) {
    // console.log('context1', context);
    this.queueContext = context;
    this.queueContext.queueName = this.queueName;
    // console.log('this', context.$options.name);
    return this;
  }

  // public static getQueues() {
  //   console.log('queues', Channel.broker.queues);
  //   return Channel.broker.queues;
  // }

  public static getExchanges() {
    return Channel.exchanges;
  }

  public assertExchange(
    exchangeName: string,
    exchangeType = ExchangeType.fanout
  ): Channel {
    this.exchangeName = exchangeName;
    this.exchangeType = exchangeType;
    return this;
  }

  public static subjectOptions: SubjectOptions = {
    INIT_VALUE: Symbol("SUBJECT_INIT_VALUE"),
    BUFFER_SIZE: Number.POSITIVE_INFINITY,
    WINDOW_TIME: 500,
  };

  private setQueues(inner: boolean) {
    this.queues = inner ? Channel.broker.innerQueues : Channel.broker.queues;
    this.emitters = Channel.broker.emitters;
    return this.queues;
  }

  protected constructor(
    queueName: string,
    stream: BehaviorSubject<unknown> | ReplaySubject<unknown>,
    options?: any
  ) {
    this.clearChannelData();
    this.queues = this.setQueues(options?.inner);
    if (!this.queues[queueName]?.subject) {
      this.queues[queueName] = {
        subject: stream, //subjectFactory(stream, Channel.subjectOptions),
        info: null,
        tempData: "",
        track: options?.track,
      };
    } else {
      if (stream) {
        // Channel.broker.queues[queueName].subject.observers.push(stream);
      }
    }
    this.queueName = queueName;
    this.options = options;
  }

  public close(): any {
    Channel.clearSubscriptions(this.queueName);
  }

  // public static getQueue(queueName: string): QueueItem {
  //   return Channel.broker.queues[queueName];
  // }

  // public static getSubject(queueName: string): Subject<any> {
  //   return Channel.getQueue(queueName).subject;
  // }

  private clearChannelData() {
    // for hard reload
    this.exchangeName = "default";
    this.operators = null;
    this.queueName = "";
    this.exchangeType = ExchangeType.fanout;
    this.httpInfo = { url: "" } as HttpInfo;
  }

  setEndpoint(endpoint: Endpoint | string): Channel {
    this.httpInfo = setHttpInfo(endpoint);

    return this;
  }

  // private assertQueue(queueName: string): Channel {
  //   this.queueName = queueName;
  //   return this;
  // }
  private pushToExchange(queuesNames: any[], msg: any) {
    queuesNames.forEach((q: string) => {
      if (!this.queues[q]) this.queues[q].subject = new BehaviorSubject(msg);
      else this.queues[q].subject.next(msg);
    });
  }

  private pushToQueues(queuesNames: string[], msg: any) {
    if (queuesNames?.length) {
      this.pushToExchange(queuesNames, msg);
    } else this.queues[this.queueName].subject.next(msg);
  }

  private pipeTransformers(stream: Observable<any>) {
    const d = Object.keys(this.builders).map((key: string) => {
      const funcItem = this.builders[key];
      const streamFunc = funcItem.builder(stream);
      return streamFunc(funcItem.functionBody);
    });
    return d[0];
  }
  private async getHttpResult() {
    let result = "";
    if (this.httpInfo?.func && typeof this.httpInfo.func === "function") {
      result = await this.httpInfo.func();
    } else if (this.httpInfo?.url) {
      result = await fetchRequest(this.httpInfo);
      // manage cache if internet is not avilable
    }
    return result;
  }

  private async setMsg<T>(msg: T) {
    let message = msg;
    const result: any = await this.getHttpResult();
    if (result && msg) {
      result.channelMsg = msg;
      message = result;
    }
    return message;
  }

  public async publish<T>(msg?: T, cb?: VoidFunction): Promise<Channel> {
    this.pushToQueues(
      Channel.exchanges[this.exchangeName],
      await this.setMsg(msg)
    );
    if (cb && typeof cb === "function") cb();
    return this;
  }

  public pipe(pipes: any): Channel {
    this.operators = pipes;
    return this;
  }

  public tube(builder: any, functionBody: any) {
    this.builders[builder.name] = { builder, functionBody };
    return this;
  }

  public funnel() {
    return this;
  }

  private static clearSubscriptions(queueName: string) {
    const subscriptions = Channel.refs.get(queueName);
    subscriptions.forEach((subscription: any) => subscription.unsubscribe());
  }

  protected createStream(queueItem: QueueItem): any {
    return queueItem.subject.pipe(
      skipWhile((x) => x === Channel.subjectOptions.INIT_VALUE)
    );
  }

  public consume<T>(
    action?: (...params: any[]) => any,
    subscribe = true
  ): Observable<T> {
    // if (this.subscriptions?.length) Channel.clearSubscriptions(this.subscriptions);
    let stream: Observable<T> = this.createStream(this.queues[this.queueName]);
    let subscription;
    const rxjsOperators: [any, any] = this.operators;
    if (rxjsOperators) {
      stream = stream.pipe(...rxjsOperators);
    }
    if (!isEmpty(this.builders)) {
      stream = this.pipeTransformers(stream);
    }
    if (action) {
      if (subscribe) subscription = stream.subscribe(action);
      else action();
    } else {
      return stream;
    }

    this.subscriptions.push(subscription);
    Channel.refs.set(this.queueName, this.subscriptions);
    return this.queues[this.queueName].subject;
  }

  // public bindQueue(queueName:string, exchangeName:string) {
  //   this.queueName = queueName;
  //   this.exchangeName = exchangeName;
  //   return this;
  // }

  public bindExchange(
    exchangeName: string,
    exchangeType = ExchangeType.fanout
  ) {
    this.exchangeName = exchangeName;
    this.exchangeType = exchangeType;
    Channel.exchanges[exchangeName] = Channel.exchanges[exchangeName] || [];
    Channel.exchanges[exchangeName].push(this.queueName);
    return this;
  }
}
