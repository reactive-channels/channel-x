import { ComponentInternalInstance } from "vue";
import { getComponentInfo } from "./getComponentInfo";

export function setQueueInfo(
  queues: any,
  queueName: string,
  instance: ComponentInternalInstance,
  channelType: any
) {
  const queue: any = queues[queueName];
  const componentData: any = getComponentInfo(instance, queueName);
  const COMPONENT_KEY = `${componentData.componentName}(uid:${componentData.uid})`;
  queue.devtools = queue.devtools || { components: {}, channels: {} };
  queue.platform = "VUE";
  // queue.name = queueName;
  queue.devtools.components[COMPONENT_KEY] = queue.devtools.components[
    COMPONENT_KEY
  ] || { info: {}, channels: {} };
  queue.devtools.components[COMPONENT_KEY].info = componentData;
  queue.devtools.components[COMPONENT_KEY].channels[channelType] =
    queue.devtools.components[COMPONENT_KEY].channels[channelType] || [];
  queue.devtools.components[COMPONENT_KEY].channels[channelType].push(
    queueName
  );
  const channelInfo = queue.devtools.channels[channelType] || {};
  queue.devtools.channels[channelType] = channelInfo;
  queue.devtools.channels[channelType][COMPONENT_KEY] = componentData;
}
