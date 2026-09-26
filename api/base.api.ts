import { APIRequestContext } from '@playwright/test';

export class BaseAPI {

    constructor(
        protected request: APIRequestContext
    ) {}

    protected getHeaders(token?: string) {

        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && {
                'Cookie': `token=${token}`
            })
        };
    }
}