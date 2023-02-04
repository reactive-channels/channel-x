import { ReplaySubject } from "rxjs";
import { Broker, createBroker } from "./broker/broker";
import { Channel } from "./Channel";

describe("Channel", () => {
  let channel: Channel;
  let broker: Broker;
  let subject: ReplaySubject<any>;
  let queueName: string;

  beforeEach(() => {
    queueName = "testQueue";
    subject = new ReplaySubject(20);
    channel = Channel.classForTestsOnly(queueName, subject);
    broker = createBroker(globalThis);
  });

  it("should initialize correctly", () => {
    const props = channel.propsForTestsOnly;
    expect(props.queueName).toEqual(queueName);
    expect(props.queueContext).toEqual(undefined);
    expect(props.subscriptions).toEqual([]);
    expect(props.operators).toEqual(undefined);
    expect(props.builders).toEqual({});
    expect(props.tempData).toEqual(undefined);
    expect(props.queues).toEqual({});
    expect(props.emitters).toEqual({});
    expect(props.exchangeName).toEqual("default");
    expect(props.exchangeType).toEqual("fanout");
    expect(props.httpInfo).toEqual({ url: "", func: null });
  });

  // it("should set context correctly", () => {
  //   const context = {};
  //   channel.scope(context);
  //   expect(channel.context).toEqual([context]);
  // });

  // it("should set settings correctly", () => {
  //   const props = channel.propsForTestsOnly;

  //   channel.broker = broker;
  //   channel.context = [1, 2, 3];
  //   const settings = channel.settings;
  //   expect(settings.broker).toEqual(broker);
  //   expect(settings.context).toEqual([1, 2, 3]);
  // });

  // it("should publish to queue correctly", () => {
  //   const msg = "test message";
  //   Channel.publishTo(queueName, msg);
  //   expect(broker.queues[queueName].subject.value).toEqual(msg);
  // });

  // it("should consume from queue correctly", () => {
  //   const msg = "test message";
  //   broker.queues[queueName].subject.next(msg);
  //   const consumed = Channel.consumeFrom(queueName);
  //   expect(consumed).toEqual(broker.queues[queueName].subject);
  //   expect(consumed.value).toEqual(msg);
  // });

  // it("should use a queue correctly", () => {
  //   const options = {};
  //   const newChannel = Channel.use(queueName, options);
  //   expect(newChannel.queueName).toEqual(queueName);
  //   expect(newChannel.options).toEqual(options);
  //   expect(newChannel.queueContext).toEqual(undefined);
  //   expect(newChannel.subscriptions).toEqual([]);
  //   expect(newChannel.operators).toEqual(undefined);
  //   expect(newChannel.builders).toEqual({});
  //   expect(newChannel.tempData).toEqual(undefined)
  // }
});
