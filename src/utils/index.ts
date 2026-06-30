export default class Utils {

    static throw(message: string, status = 500) {
        const err = new Error(message) as any
        err.status = status
        throw err
    }

    static catch(error: any) {

        return { status: 500, message: error.message, ...error }
    }

}