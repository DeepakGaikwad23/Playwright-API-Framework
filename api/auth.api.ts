import { APIRequestContext } from '@playwright/test';

export class AuthAPI {

    constructor(
        private request: APIRequestContext
    ) {}

    async login(username: string, password: string) {

        return await this.request.post('/auth', {

            data: {
                username,
                password
            },

            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}