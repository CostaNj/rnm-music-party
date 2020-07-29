export interface Error {
    type: string,
    text: string
}

export interface AxiosResponse {
    data: {
        response: any
        error?: Error
    }
}