import { useEffect, useState } from "react";
import { HttpInfo } from "./../../../core.channel/src/lib/types/HttpInfo";

import { Channel as CoreChannel } from "@channel-x/core-channel";
import { BehaviorSubject, ReplaySubject, Subscription } from "rxjs";

// import { Endpoint } from "@channel-x/core-channel/src/lib/types/Endpoint";
import { setParentsHierarchy } from "./internal/getComponentInfo";
import { setQueueInfo } from "./internal/setQueueInfo";
import { ComponentInfo } from "./types/ComponentInfo";
import { InfoType } from "./types/InfoType";

export class Channel extends CoreChannel {
  private componentInfo!: ComponentInfo;
  private devtools: any;
  public static use(queueName: string, options?: any): Channel {
    // onMounted(() => {
    //   const instane = getCurrentInstance();
    // });

    return new Channel(queueName, new ReplaySubject(20), options);
  }

  public setEmitter(path: any, options?: any) {
    this.emitters = [];
  }

  public static useReplay(queueName: string, options?: any): Channel {
    return new Channel(queueName, new ReplaySubject(20), options);
  }
  public static innerUse(queueName: string, options?: any) {
    return new Channel(queueName, new ReplaySubject(20), {
      ...options,
      ...{ inner: true },
    });
  }

  public static get emitter() {
    return new Channel("emitter", new ReplaySubject(20), {});
  }

  public static emit(msg: any, options?: any) {
    console.warn("please use the plugin");
  }

  private constructor(
    queueName: string,
    subject: BehaviorSubject<unknown> | ReplaySubject<unknown>,
    options?: any
  ) {
    //Channel.queues= § Proxy(super._queues, this.vueQueuesHandler)
    super(queueName, subject as any, options);
    //console.log('vue 3');
  }

  private setInfo(infoType: InfoType, instance: any) {
    if (instance) {
      setQueueInfo(
        this.queues,
        this.queueName,
        instance,
        infoType,
        this.httpInfo
      );
    } else {
      console.error("instance is undefined");
    }
  }

  getEmitterQName(instance: any) {
    const file: string = instance?.type.__file || "";
    const type = instance?.type;
    const name: string = instance
      ? setParentsHierarchy(instance).join(".")
      : "";
    return "emitter:" + name.toLocaleLowerCase();
  }

  replaceEmitterQueue(instance: any) {
    if (this.queueName !== "emitter") return;
    const oldQueueName = this.queueName + "";
    this.queueName = this.getEmitterQName(instance);
    if (oldQueueName !== this.queueName) {
      this.queues[this.queueName] = this.queues[oldQueueName];
      delete this.queues[oldQueueName];
    }
  }

  // public assign(type: InfoType) {
  //   onMounted(() => {
  //     const instance = getCurrentInstance();
  //     if (instance) this.replaceEmitterQueue(instance);
  //     this.setInfo(type);
  //   });
  // }

  public on(path: string) {}

  public publish<T>(msg?: T, cb?: VoidFunction, context?: any): Promise<any> {
    console.log("context", context);
    // onMounted(() => {

    //   this.setInfo(InfoType.PUBLISHERS);
    // });
    return super.publish(msg, cb);
  }

  setEndpoint(endpoint: any | string): Channel {
    this.httpInfo = super.setEndpoint(endpoint, false) as HttpInfo;

    return this;
  }
  public pipe(...pipes: any): Channel {
    this.operators = pipes;
    return this;
  }

  public consume(action?: (...params: any[]) => any): any {
    //  const msg = ref('');
    console.log("this", this);
    let stream: Subscription | any;
    // onMounted(() => {
    //   this.setInfo(InfoType.CONSUMERS);
    // });

    //console.log('el', this.componentInfo?.instance.vnode.el);
    if (action) stream = super.consume().subscribe((x: any) => action(x));

    // return { msg, queueName: super.queueName };
    // onBeforeUnmount(() => {
    //   stream.unsubscribe();
    //   // console.log('onBeforeUnmount');
    // });
    ``;
  }

  public consumer(instance?: any) {
    // const currentInstance = JSON.parse(instance);
    console.log("currentInstance", instance);
    this.setInfo(InfoType.CONSUMERS, instance);
    //const history: any = ref([]);
    const [msg, setMessage] = useState("");
    let stream: Subscription | any;
    // add option to unref
    useEffect(() => {
      stream = super.consume().subscribe((x: any) => {
        setMessage(x);
      });
      //  history.value.push(x);
      //  msg.value = x;
    });
    // onMounted(() => {
    //   this.setInfo(InfoType.CONSUMERS);
    // });
    // onBeforeUnmount(() => {
    //   stream.unsubscribe();
    // });
    return [msg, super.queueName];
    // return {
    //   msg,
    //   // history,
    //   //  unRefValue: () => msg.value,
    //   queueName: super.queueName,
    // };
  }
}
