"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
/**
 * Check types.
 */
var CheckType;
(function (CheckType) {
    /** DNS check */
    CheckType["Dns"] = "dns";
    /** HTTP check */
    CheckType["Http"] = "http";
})(CheckType || (CheckType = {}));
/**
 * Exit codes.
 */
var ExitCode;
(function (ExitCode) {
    /** Script exited successfully */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /** Wrong parameter was passed */
    ExitCode[ExitCode["ErrorWrongParameter"] = 1] = "ErrorWrongParameter";
    /** An error occurred */
    ExitCode[ExitCode["Error"] = 2] = "Error";
})(ExitCode || (ExitCode = {}));
/* Get the arguments from the command line */
const args = process.argv.slice(2);
/* Get values from the arguments */
const type = (_a = args[0]) !== null && _a !== void 0 ? _a : "";
const url = (_b = args[1]) !== null && _b !== void 0 ? _b : "";
const value = (_c = args[2]) !== null && _c !== void 0 ? _c : "";
/* Check if the arguments are correct */
if (args.length < 2 || args.length > 3) {
    process.stderr.write("Usage: node domain-verify.js <dns|http> <url> <value>");
    process.exit(ExitCode.ErrorWrongParameter);
}
/* Check if the first argument is dns or http */
if (type !== CheckType.Dns && type !== CheckType.Http) {
    process.stderr.write("First argument must be 'dns' or 'http'");
    process.exit(ExitCode.ErrorWrongParameter);
}
/**
 * Prepare return object
 */
const data = {
    url,
    value,
    success: false
};
/** Use dns check */
if (type === CheckType.Dns) {
    (0, src_1.checkDns)(url, value)
        .then((result) => {
        data.success = result;
        process.stdout.write(JSON.stringify(data));
        process.exit(ExitCode.Success);
    })
        .catch((error) => {
        process.stderr.write(error.message);
        process.exit(ExitCode.Error);
    });
}
/** Use http check */
if (type === CheckType.Http) {
    (0, src_1.checkHttp)(url, value)
        .then((result) => {
        data.success = result;
        process.stdout.write(JSON.stringify(data));
        process.exit(ExitCode.Success);
    })
        .catch((error) => {
        process.stderr.write(error.message);
        process.exit(ExitCode.Error);
    });
}
