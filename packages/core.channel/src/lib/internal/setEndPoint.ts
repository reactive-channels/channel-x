import { Endpoint } from '../types/Endpoint';
import { HttpInfo } from '../types/HttpInfo';
import { HttpMethod } from '../types/HttpMethod';

export function setHttpInfo(endpoint:Endpoint|string):HttpInfo {
  const httpInfo = {} as HttpInfo;
  if (typeof endpoint === 'string') {
    httpInfo.url = endpoint;
    httpInfo.method = HttpMethod.GET;
  } else if (typeof endpoint === 'function') {
    httpInfo.func = endpoint;
  } else {
    httpInfo.url = endpoint.url;
    httpInfo.method = endpoint.method;
    httpInfo.data = endpoint.data;
    httpInfo.options = endpoint.options;
  }

  return httpInfo;
}
