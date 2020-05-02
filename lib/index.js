"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line
function getNodeParams() {
    // eslint-disable-next-line
    return process.argv.slice(2).reduce(function (params, param) {
        var _a = param.split('='), key = _a[0], val = _a[1];
        params[key] = val;
        return params;
    }, {});
}
exports.getNodeParams = getNodeParams;
