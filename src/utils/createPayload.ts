import { Request } from 'express';

function createPayload(data: any): Request {
    return {
        body: data,
        params: {},
        query: {},
        headers: {},
    } as Request;
}

export { createPayload }