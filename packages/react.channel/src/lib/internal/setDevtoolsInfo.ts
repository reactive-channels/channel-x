import { ComponentInternalInstance } from "vue";
import { getComponentInfo } from "./getComponentInfo";

export function setDevtoolsInfo(
  devtoolRef: any,
  queueName: string,
  instance: ComponentInternalInstance,
  infoType: any
) {
  const componentData = getComponentInfo(instance, queueName);
  devtoolRef.info = devtoolRef.info || {};
  devtoolRef.info[infoType] = queue.info[infoType] || {};
  devtoolRef.info[infoType][
    `${componentData.componentName}(uid:${componentData.uid})`
  ] = componentData;
}
