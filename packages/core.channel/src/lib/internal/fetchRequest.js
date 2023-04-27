"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRequest = void 0;
const tslib_1 = require("tslib");
function fetchRequest(httpInfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return fetch(httpInfo.url, httpInfo).then((response) => response.json());
    });
}
exports.fetchRequest = fetchRequest;
//# sourceMappingURL=fetchRequest.js.map