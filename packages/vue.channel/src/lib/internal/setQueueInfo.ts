import { ComponentInternalInstance } from "vue";
import { QueueItem } from "./../../../../core.channel/src/lib/types/QueueItem";
import { getComponentInfo } from "./getComponentInfo";

export function setQueueInfo(
  queue: QueueItem,
  queueName: string,
  instance: ComponentInternalInstance,
  infoType: any
) {
  const componentData = getComponentInfo(instance, queueName);
  queue.info = queue.info || {};
  queue.platform = "VUE";
  queue.devtools = queue.devtools || { components: {} };
  queue.devtools.components[
    `${componentData.componentName}(uid:${componentData.uid})`
  ] = componentData;
  queue.name = queueName;
  queue.info[infoType] = queue.info[infoType] || {};
  queue.info[infoType][
    `${componentData.componentName}(uid:${componentData.uid})`
  ] = componentData;
}
