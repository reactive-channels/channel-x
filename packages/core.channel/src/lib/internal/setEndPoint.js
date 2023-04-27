"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHttpInfo = void 0;
const HttpMethod_1 = require("../types/HttpMethod");
function setHttpInfo(endpoint) {
    const httpInfo = {};
    if (typeof endpoint === 'string') {
        httpInfo.url = endpoint;
        httpInfo.method = HttpMethod_1.HttpMethod.GET;
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
exports.setHttpInfo = setHttpInfo;
//# sourceMappingURL=setEndPoint.js.map