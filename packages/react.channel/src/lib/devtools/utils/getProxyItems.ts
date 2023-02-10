import { showValueAsAStringIfEmpty } from './showValueAsAStringIfEmpty';

export const getProxyItems = (obj: any) =>
  Object.keys(obj).map((key) => ({
    [key]: showValueAsAStringIfEmpty(
      Object.getOwnPropertyDescriptor(obj, key)?.value
    ),
  }));
