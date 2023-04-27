import { __awaiter } from "tslib";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { skipWhile } from "rxjs/operators";
import { createBroker } from "./broker/broker";
import { fetchRequest } from "./internal/fetchRequest";
import { isEmpty } from "./internal/isEmpty";
import { setHttpInfo } from "./internal/setEndPoint";
import { DataType } from "./types/DataType";
import { ExchangeType } from "./types/ExchangeType";
export class Channel {
    // protected static get queues() {
    //   return Channel._queues;
    // }
    static classForTestsOnly(queueName, stream, options) {
        return new Channel(queueName, stream, options);
    }
    get propsForTestsOnly() {
        return {
            queueName: this.queueName,
            queueContext: this.queueContext,
            subscriptions: this.subscriptions,
            operators: this.operators,
            builders: this.builders,
            tempData: this.tempData,
            queues: this.queues,
            emitters: this.emitters,
            exchangeName: this.exchangeName,
            exchangeType: this.exchangeType,
            httpInfo: this.httpInfo,
        };
    }
    static publishTo(queueName, msg) {
        if (Channel.broker.queues[queueName]) {
            Channel.broker.queues[queueName].subject.next(msg);
        }
    }
    static consumeFrom(queueName) {
        var _a;
        return (_a = Channel.broker.queues[queueName]) === null || _a === void 0 ? void 0 : _a.subject;
    }
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
    static get settings() {
        return {
            broker: Channel.broker,
            context: Channel.context,
        };
    }
    //private builders: Map<string, VoidFunction> = new Map();
    scope(context) {
        Channel.context.push(context);
        return this;
    }
    static use(queueName, options) {
        return new Channel(queueName, 
        // new BehaviorSubject(this.subjectOptions.INIT_VALUE),
        new ReplaySubject(20), options);
    }
    static useReplay(queueName, options) {
        return new Channel(queueName, new ReplaySubject(20), options);
    }
    static innerUse(queueName, options) {
        return new Channel(queueName, new ReplaySubject(20), Object.assign(Object.assign({}, options), { inner: true }));
    }
    // public setQueueInfo(queueName: string, info: any, key: string) {
    //   Channel.queues[queueName].info = { components: { [key]: info } };
    // }
    stash(msg, type = DataType.TEXT, override = true) {
        const queue = this.queues[this.queueName];
        switch (type) {
            case DataType.TEXT:
                override ? (queue.tempData = msg) : (queue.tempData += msg);
        }
    }
    stashAndPublishWhen() {
        return "";
    }
    flushAndPublish() {
        const queue = this.queues[this.queueName];
        const data = queue === null || queue === void 0 ? void 0 : queue.tempData;
        if (data !== undefined) {
            this.publish(data, () => (queue.tempData = ""));
        }
    }
    context(context) {
        // console.log('context1', context);
        this.queueContext = context;
        this.queueContext.queueName = this.queueName;
        // console.log('this', context.$options.name);
        return this;
    }
    static getQueues() {
        console.log("queues", Channel.broker.queues);
        return Channel.broker.queues;
    }
    static getExchanges() {
        return Channel.exchanges;
    }
    assertExchange(exchangeName, exchangeType = ExchangeType.fanout) {
        this.exchangeName = exchangeName;
        this.exchangeType = exchangeType;
        return this;
    }
    setQueues(inner) {
        this.queues = inner ? Channel.broker.innerQueues : Channel.broker.queues;
        this.emitters = Channel.broker.emitters;
        return this.queues;
    }
    constructor(queueName, stream, options) {
        var _a;
        this.subscriptions = [];
        this.builders = {};
        this.exchangeName = "default";
        this.exchangeType = ExchangeType.fanout;
        this.httpInfo = { url: "", func: null };
        this.clearChannelData();
        this.queues = this.setQueues(options === null || options === void 0 ? void 0 : options.inner);
        if (!((_a = this.queues[queueName]) === null || _a === void 0 ? void 0 : _a.subject)) {
            this.queues[queueName] = {
                subject: stream,
                info: null,
                tempData: "",
                track: options === null || options === void 0 ? void 0 : options.track,
            };
        }
        else {
            if (stream) {
                // Channel.broker.queues[queueName].subject.observers.push(stream);
            }
        }
        this.queueName = queueName;
        this.options = options;
    }
    close() {
        Channel.clearSubscriptions(this.queueName);
    }
    // public static getQueue(queueName: string): QueueItem {
    //   return Channel.broker.queues[queueName];
    // }
    // public static getSubject(queueName: string): Subject<any> {
    //   return Channel.getQueue(queueName).subject;
    // }
    clearChannelData() {
        // for hard reload
        this.exchangeName = "default";
        this.operators = null;
        this.queueName = "";
        this.exchangeType = ExchangeType.fanout;
        this.httpInfo = { url: "" };
    }
    setEndpoint(endpoint, isCore = true) {
        this.httpInfo = setHttpInfo(endpoint);
        if (!isCore)
            return this.httpInfo;
        return this;
    }
    // private assertQueue(queueName: string): Channel {
    //   this.queueName = queueName;
    //   return this;
    // }
    pushToExchange(queuesNames, msg) {
        queuesNames.forEach((q) => {
            if (!this.queues[q])
                this.queues[q].subject = new BehaviorSubject(msg);
            else
                this.queues[q].subject.next(msg);
        });
    }
    pushToQueues(queuesNames, msg) {
        if (queuesNames === null || queuesNames === void 0 ? void 0 : queuesNames.length) {
            this.pushToExchange(queuesNames, msg);
        }
        else
            this.queues[this.queueName].subject.next(msg);
    }
    pipeTransformers(stream) {
        const d = Object.keys(this.builders).map((key) => {
            const funcItem = this.builders[key];
            const streamFunc = funcItem.builder(stream);
            return streamFunc(funcItem.functionBody);
        });
        return d[0]; // for now only one pipe
    }
    getHttpResult() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let result = "";
            if (((_a = this.httpInfo) === null || _a === void 0 ? void 0 : _a.func) && typeof this.httpInfo.func === "function") {
                result = yield this.httpInfo.func();
            }
            else if ((_b = this.httpInfo) === null || _b === void 0 ? void 0 : _b.url) {
                result = yield fetchRequest(this.httpInfo);
                // manage cache if internet is not avilable
            }
            return result;
        });
    }
    setMsg(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = msg;
            const result = yield this.getHttpResult();
            if (result && msg) {
                result.channelMsg = msg;
                message = result;
            }
            return message;
        });
    }
    publish(msg, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushToQueues(Channel.exchanges[this.exchangeName], yield this.setMsg(msg));
            if (cb && typeof cb === "function")
                cb();
            return this;
        });
    }
    pipe(pipes) {
        this.operators = pipes;
        return this;
    }
    tube(builder, functionBody) {
        this.builders[builder.name] = { builder, functionBody };
        return this;
    }
    funnel() {
        return this;
    }
    static clearSubscriptions(queueName) {
        const subscriptions = Channel.refs.get(queueName);
        subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
    createStream(queueItem) {
        return queueItem.subject.pipe(skipWhile((x) => x === Channel.subjectOptions.INIT_VALUE));
    }
    consume(action, subscribe = true) {
        // if (this.subscriptions?.length) Channel.clearSubscriptions(this.subscriptions);
        let stream = this.createStream(this.queues[this.queueName]);
        let subscription;
        const rxjsOperators = this.operators;
        if (rxjsOperators) {
            stream = stream.pipe(...rxjsOperators);
        }
        if (!isEmpty(this.builders)) {
            stream = this.pipeTransformers(stream);
        }
        if (action) {
            if (subscribe)
                subscription = stream.subscribe(action);
            else
                action();
        }
        else {
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
    bindExchange(exchangeName, exchangeType = ExchangeType.fanout) {
        this.exchangeName = exchangeName;
        this.exchangeType = exchangeType;
        Channel.exchanges[exchangeName] = Channel.exchanges[exchangeName] || [];
        Channel.exchanges[exchangeName].push(this.queueName);
        return this;
    }
}
Channel.INIT_VALUE = `INIT_VALUE${new Date().valueOf()}`;
// private static readonly INIT_VALUE = Symbol('INIT_VALUE');
Channel._queues = {};
// protected static queues = new Proxy(this._queues, this.queuesHandler);
Channel.broker = createBroker(globalThis);
Channel.exchanges = {};
Channel.context = [];
Channel.refs = new Map();
Channel.subjectOptions = {
    INIT_VALUE: Symbol("SUBJECT_INIT_VALUE"),
    BUFFER_SIZE: Number.POSITIVE_INFINITY,
    WINDOW_TIME: 500,
};
//# sourceMappingURL=Channel.js.map