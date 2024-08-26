"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHttp = void 0;
const node_https_1 = require("node:https");
/**
 * Check if an HTTP response contains a specific value.
 *
 * @param url The URL to check
 * @param value The value to check for
 * @returns A promise that resolves to a boolean indicating the value was found
 */
const checkHttp = (url, value) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        /* Get the requested URL */
        (0, node_https_1.get)(url, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                resolve(data.includes(value));
            });
            response.on("error", (error) => {
                reject(error);
            });
        });
    });
});
exports.checkHttp = checkHttp;
