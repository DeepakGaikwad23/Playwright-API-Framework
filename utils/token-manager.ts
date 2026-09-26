import { APIRequestContext, expect } from '@playwright/test';

export async function getToken(
    request: APIRequestContext
): Promise<string> {

    const response = await request.post('/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    return body.token;
}