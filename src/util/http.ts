import { userAgent } from './env'

export const unsafe_fetch: typeof fetch = (...args) => {
    /* @ts-ignore */
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    return fetch(...args)
}

export namespace httpHeaders {

    export const json = {
        'content-type': 'application/json;charset=utf-8'
    }

    export const html = {
        'content-type': 'text/html'
    }

    export const cors = {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,OPTIONS',
        'access-control-allow-headers': 'Range,Cache-Control',
        'access-control-expose-headers': 'Content-Length,Content-Range,Content-Disposition'
    }

    export const client = {
        'user-agent': userAgent
    }
}

export function getResponse(...args: Parameters<typeof fetch>): Promise<Response> {
    return fetch(...args)
}

export async function getText(...args: Parameters<typeof fetch>): Promise<string> {
    const response = await getResponse(...args)
    return response.text()
}

export async function getJson<T = any>(...args: Parameters<typeof fetch>): Promise<T> {
    const response = await getResponse(...args)
    return response.json() as Promise<T>
}