import { resolveTxt } from "node:dns"

/**
 * Check if a DNS TXT record contains a specific value.
 *
 * @param domain The domain name
 * @param value The value to check for
 * @returns A promise that resolves to a boolean indicating the value was found
 */
export const checkDns = async (domain: string, value: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {

        /* Resolve the requested dns entry */
        resolveTxt(domain, (error, records) => {
            if (error) {
                return reject(error)
            }

            /* Check if the value is in the records */
            const keys = records
                .map((record) => record.join(""))
                .filter((record) => record.includes(value))

            resolve(keys.length > 0)
        })
    })
}
