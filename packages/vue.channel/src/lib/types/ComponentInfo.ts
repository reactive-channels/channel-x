import { ComponentInternalInstance, RendererNode, VNode } from 'vue';

export interface ComponentInfo {
  filePath: string;
  fileName: string;
  componentName: string;
  isFragment: boolean;
  subTree: VNode;
  instance: ComponentInternalInstance;
  node: VNode;
  el: RendererNode | null;
  uid: number;
  parent: any;
  parentsHierarchy: string[];
  queueName: string;
}
