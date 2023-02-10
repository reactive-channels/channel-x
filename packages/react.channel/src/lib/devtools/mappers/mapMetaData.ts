import { getProxyItems } from '../utils/getProxyItems';

export const mapMetaData = (state: any) =>
  Object.keys(state).map((key) => {
    const metaData: any = Object.getOwnPropertyDescriptor(state, key)?.value;
    return {
      isProps: key === 'props',
      key,
      value: key === 'props' ? getProxyItems(state[key]) : state[key],
      isRef: metaData?.__v_isRef,
      isShallow: metaData?.__v_isShallow,
      _value: metaData?._value,
      proxyValue: metaData?.value,
      hasMetaData: metaData && typeof metaData !== 'string',
      ref: state,
      isComponent: !!metaData?.__hmrId,
    };
  });
