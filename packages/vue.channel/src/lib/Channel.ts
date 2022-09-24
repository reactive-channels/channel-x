import { Channel as CoreChannel } from "@channel-x/core-channel";
import { QueueItem } from "packages/core.channel/src/lib/types/QueueItem";
import { BehaviorSubject, ReplaySubject, Subscription } from "rxjs";
import {
  ComponentInternalInstance,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { setParentsHierarchy } from "./internal/getComponentInfo";
import { setQueueInfo } from "./internal/setQueueInfo";
import { ComponentInfo } from "./types/ComponentInfo";
import { InfoType } from "./types/InfoType";

export class Channel extends CoreChannel {
  private componentInfo!: ComponentInfo;
  // public static queues :any= reactive(Channel.queues);
  public static use(queueName: string, options?: any): Channel {
    onMounted(() => {
      const instane = getCurrentInstance();
    });

    return new Channel(
      queueName,
      // new BehaviorSubject(this.subjectOptions.INIT_VALUE),
      new ReplaySubject(20),
      options
    );
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
    // const channel = new Channel('emitter', new ReplaySubject(20), {});
    // onMounted(() => {
    //   const instance = getCurrentInstance();
    //   const file: string = instance?.type.__file || '';
    //   const type = instance?.type;
    //   const name: string = instance
    //     ? setParentsHierarchy(instance).join('.')
    //     : '';
    //   const channel = new Channel(
    //     'emit:' + name.toLocaleLowerCase(),
    //     new ReplaySubject(20),
    //     options
    //   );

    //   channel.publish(msg);
    // });
  }

  // public static get queues(): any {
  //   return reactive(Channel._queues);
  // }

  // public getQueues() {
  //   return Channel.broker.queues;
  // }

  private constructor(
    queueName: string,
    subject: BehaviorSubject<unknown> | ReplaySubject<unknown>,
    options?: any
  ) {
    //Channel.queues= § Proxy(super._queues, this.vueQueuesHandler)
    super(queueName, subject as any, options);
    //console.log('vue 3');
  }

  private setInfo(infoType: InfoType, queue: QueueItem, queueName: string) {
    const instance = getCurrentInstance();
    if (instance) {
      setQueueInfo(queue, queueName, instance, infoType);
    } else {
      console.error("instance is undefined");
    }
  }
  // public static useFromStream(subject: any, queueName: string) {
  //   const channel = Channel.use(queueName);
  //   subject.subscribe((x: any) => {
  //     channel.pipe(from(x));
  //   });
  //   return channel;
  // }

  getEmitterQName(instance: ComponentInternalInstance) {
    const file: string = instance?.type.__file || "";
    const type = instance?.type;
    const name: string = instance
      ? setParentsHierarchy(instance).join(".")
      : "";
    return "emitter:" + name.toLocaleLowerCase();
  }

  replaceEmitterQueue(instance: ComponentInternalInstance) {
    if (this.queueName !== "emitter") return;
    const oldQueueName = this.queueName + "";
    this.queueName = this.getEmitterQName(instance);
    if (oldQueueName !== this.queueName) {
      this.queues[this.queueName] = this.queues[oldQueueName];
      delete this.queues[oldQueueName];
    }
  }

  public assign(type: InfoType) {
    onMounted(() => {
      const instance = getCurrentInstance();
      if (instance) this.replaceEmitterQueue(instance);
      this.setInfo(type, this.queues[this.queueName], this.queueName);
    });
  }

  // public triggerEmit(val) {
  //   console.log('triggerEmit', val);

  //   // this.replaceEmitterQueue(getCurrentInstance());
  // }

  public on(path: string) {
    // const pathItems = path.split('->'); // example 'parent->child->grandchild'
    // if (pathItems.length) {
    // }
  }

  public publish<T>(msg?: T, cb?: VoidFunction): Promise<any> {
    onMounted(() => {
      // this.replaceEmitterQueue(getCurrentInstance());
      this.setInfo(
        InfoType.PUBLISHERS,
        this.queues[this.queueName],
        this.queueName
      );
    });
    return super.publish(msg, cb);
  }
  public pipe(...pipes: any): Channel {
    this.operators = pipes;
    return this;
  }

  public consume(action?: (...params: any[]) => any): any {
    //  const msg = ref('');
    let stream: Subscription | any;
    onMounted(() => {
      this.setInfo(
        InfoType.CONSUMERS,
        this.queues[this.queueName],
        this.queueName
      );
    });

    //console.log('el', this.componentInfo?.instance.vnode.el);
    stream = super.consume().subscribe(action);

    // return { msg, queueName: super.queueName };
    onBeforeUnmount(() => {
      stream.unsubscribe();
      // console.log('onBeforeUnmount');
    });
  }

  public get consumer() {
    const history: any = ref([]);
    const msg: any = ref("");
    let stream: Subscription | any;
    // add option to unref
    stream = super.consume().subscribe((x: unknown) => {
      history.value.push(x);
      msg.value = x;
    });
    onMounted(() => {
      this.setInfo(
        InfoType.CONSUMERS,
        this.queues[this.queueName],
        this.queueName
      );
    });
    onBeforeUnmount(() => {
      stream.unsubscribe();
      // console.log('onBeforeUnmount');
    });

    return {
      msg,
      history,
      unRefValue: () => msg.value,
      queueName: super.queueName,
    };
  }
}
