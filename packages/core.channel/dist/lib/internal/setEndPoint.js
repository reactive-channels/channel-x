import { HttpMethod } from '../types/HttpMethod';
export function setHttpInfo(endpoint) {
    const httpInfo = {};
    if (typeof endpoint === 'string') {
        httpInfo.url = endpoint;
        httpInfo.method = HttpMethod.GET;
    }
    else if (typeof endpoint === 'function') {
        httpInfo.func = endpoint;
    }
    else {
        httpInfo.url = endpoint.url;
        httpInfo.method = endpoint.method;
        httpInfo.data = endpoint.data;
        httpInfo.options = endpoint.options;
    }
    return httpInfo;
}
//# sourceMappingURL=setEndPoint.js.map