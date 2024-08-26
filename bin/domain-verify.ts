import { checkDns, checkHttp } from "../src"

/**
 * Check types.
 */
enum CheckType {

    /** DNS check */
    Dns = "dns",

    /** HTTP check */
    Http = "http"
}

/**
 * Exit codes.
 */
enum ExitCode {

    /** Script exited successfully */
    Success = 0,

    /** Wrong parameter was passed */
    ErrorWrongParameter = 1,

    /** An error occurred */
    Error = 2
}

/**
 * Structured result interface.
 */
interface Result {

    /** The URL input. */
    url: string

    /** The value input. */
    value: string

    /** The value was found and matched */
    success: boolean
}

/* Get the arguments from the command line */
const args = process.argv.slice(2)

/* Get values from the arguments */
const type = args[0] ?? ""
const url = args[1] ?? ""
const value = args[2] ?? ""

/* Check if the arguments are correct */
if (args.length < 2 || args.length > 3) {
    process.stderr.write("Usage: node domain-verify.js <dns|http> <url> <value>")
    process.exit(ExitCode.ErrorWrongParameter)
}

/* Check if the first argument is dns or http */
if (type !== CheckType.Dns && type !== CheckType.Http) {
    process.stderr.write("First argument must be 'dns' or 'http'")
    process.exit(ExitCode.ErrorWrongParameter)
}

/**
 * Prepare return object
 */
const data: Result = {
    url,
    value,
    success: false
}

/** Use dns check */
if (type === CheckType.Dns) {
    checkDns(url, value)
    .then((result) => {

        data.success = result

        process.stdout.write(JSON.stringify(data))

        process.exit(ExitCode.Success)
    })
    .catch((error) => {
        process.stderr.write(error.message)

        process.exit(ExitCode.Error)
    })
}

/** Use http check */
if (type === CheckType.Http) {
    checkHttp(url, value)
    .then((result) => {
        data.success = result

        process.stdout.write(JSON.stringify(data))

        process.exit(ExitCode.Success)
    })
    .catch((error) => {
        process.stderr.write(error.message)

        process.exit(ExitCode.Error)
    })
}
