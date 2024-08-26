import { get } from "node:https"

/**
 * Check if an HTTP response contains a specific value.
 *
 * @param url The URL to check
 * @param value The value to check for
 * @returns A promise that resolves to a boolean indicating the value was found
 */
export const checkHttp = async (url: string, value: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {

        /* Get the requested URL */
        get(url, (response) => {

            let data = ""

            response.on("data", (chunk) => {
                data += chunk
            })

            response.on("end", () => {
                resolve(data.includes(value))
            })

            response.on("error", (error) => {
                reject(error)
            })
        })
    })
}
