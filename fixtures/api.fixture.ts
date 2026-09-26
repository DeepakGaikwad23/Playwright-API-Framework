import {
    test as base,
    expect
} from '@playwright/test';

import { testData } from '../utils/test-data';


type APIFixtures = {

    token: string;

};


export const test =
    base.extend<APIFixtures>({

        token: async ({ request }, use) => {

            // ==============================
            // LOGIN
            // ==============================

            const response =
                await request.post('/auth', {

                    data: testData.validUser,

                    headers: {

                        'Content-Type':
                            'application/json',

                        'Accept':
                            'application/json'
                    }
                });


            // ==============================
            // VALIDATE LOGIN
            // ==============================

            expect(response.status())
                .toBe(200);


            // ==============================
            // GET TOKEN
            // ==============================

            const body =
                await response.json();

            const token =
                body.token;


            expect(token)
                .toBeTruthy();


            console.log(
                'Generated Token:',
                token
            );


            // ==============================
            // PROVIDE TOKEN TO TEST
            // ==============================

            await use(token);
        }
    });


export {
    expect
} from '@playwright/test';

