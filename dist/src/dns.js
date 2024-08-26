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
exports.checkDns = void 0;
const node_dns_1 = require("node:dns");
/**
 * Check if a DNS TXT record contains a specific value.
 *
 * @param domain The domain name
 * @param value The value to check for
 * @returns A promise that resolves to a boolean indicating the value was found
 */
const checkDns = (domain, value) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        /* Resolve the requested dns entry */
        (0, node_dns_1.resolveTxt)(domain, (error, records) => {
            if (error) {
                return reject(error);
            }
            /* Check if the value is in the records */
            const keys = records
                .map((record) => record.join(""))
                .filter((record) => record.includes(value));
            resolve(keys.length > 0);
        });
    });
});
exports.checkDns = checkDns;
