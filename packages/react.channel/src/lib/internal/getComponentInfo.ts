import { ComponentInternalInstance } from "vue";
import { ComponentInfo } from "../types/ComponentInfo";

const isFragment = (instance: ComponentInternalInstance) => {
  return typeof instance?.subTree?.type !== "string";
};
const getFragmentDiv = (instance: ComponentInternalInstance | any) =>
  instance.subTree.dynamicChildren[0].el.parentElement;
const getComponentName = (type: any, fileName: string) =>
  type?.name ? type.name : fileName?.split(".")[0] || "";

const getFileName = (filePath: string) =>
  filePath?.substring(filePath.lastIndexOf("/") + 1);
export const setParentsHierarchy = (
  currentInstance: ComponentInternalInstance,
  array?: string[]
) => {
  const arr = array || [];
  if (currentInstance.parent) {
    const item = currentInstance.parent;
    setParentsHierarchy(item, arr);
    const name: string = getComponentName(
      item.type,
      getFileName(item?.type.__file || "")
    );
    arr.push(name.toLocaleLowerCase());
  }
  return arr;
};

export function getComponentInfo(
  currentInstance: ComponentInternalInstance,
  httpInfo: any
): ComponentInfo {
  if (!currentInstance) ({} as ComponentInfo);
  const file: string = currentInstance?.type.__file || "";
  const type = currentInstance?.type;
  const fileName = getFileName(file);
  const componentInfo: any = {
    //ComponentInfo = {
    filePath: file,
    httpInfo,
    fileName,
    // isFragment: isFragment(currentInstance),
    // subTree: currentInstance.subTree,
    instance: currentInstance,
    // parent: currentInstance.parent,
    // parentsHierarchy: setParentsHierarchy(currentInstance),
    componentName: getComponentName(type, fileName),
    // node: currentInstance.vnode,
    // el: isFragment(currentInstance)
    //   ? getFragmentDiv(currentInstance)
    //   : currentInstance.vnode.el,
    // uid: currentInstance.uid,
  };
  return componentInfo;
}
