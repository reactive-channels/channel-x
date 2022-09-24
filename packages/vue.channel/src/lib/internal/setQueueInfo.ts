import { ComponentInternalInstance } from 'vue';
import { QueueItem } from './../../../../core.channel/src/lib/types/QueueItem';
import { getComponentInfo } from './getComponentInfo';

export function setQueueInfo(
  queue: QueueItem,
  queueName: string,
  instance: ComponentInternalInstance,
  infoType: any
) {
  const info = getComponentInfo(instance, queueName);
  queue.info = queue.info || {};
  queue.name = queueName;
  queue.info[infoType] = queue.info[infoType] || {};
  queue.info[infoType][`${info.componentName}(uid:${info.uid})`] = info;
}
