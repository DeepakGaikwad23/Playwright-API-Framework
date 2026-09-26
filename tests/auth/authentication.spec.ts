import {
    test,
    expect
} from '@playwright/test';

import { AuthAPI } from '../../api/auth.api';

import { testData } from '../../utils/test-data';


test.describe('Authentication API Tests', () => {

    test('Login with valid credentials', async ({
        request
    }) => {

        const authAPI =
            new AuthAPI(request);


        const response =
            await authAPI.login(

                testData.validUser.username,

                testData.validUser.password
            );


        expect(response.status())
            .toBe(200);


        const body =
            await response.json();


        console.log(
            'Authentication Response:',
            body
        );


        expect(body.token)
            .toBeTruthy();

    });

});

