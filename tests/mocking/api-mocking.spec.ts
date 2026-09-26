import { test, expect } from '@playwright/test';

test.describe('API Mocking Tests', () => {

    test('Mock GET booking API response', async ({ page }) => {

        // ==========================================
        // 1. MOCK / INTERCEPT API
        // ==========================================

        await page.route(
            'https://restful-booker.herokuapp.com/booking/1',
            async route => {

                console.log('API request intercepted');

                await route.fulfill({

                    status: 200,

                    contentType: 'application/json',

                    body: JSON.stringify({

                        firstname: 'Mock',

                        lastname: 'User',

                        totalprice: 999,

                        depositpaid: true,

                        bookingdates: {

                            checkin: '2026-10-01',

                            checkout: '2026-10-05'
                        },

                        additionalneeds: 'Breakfast'
                    })
                });
            }
        );


        // ==========================================
        // 2. CREATE TEST PAGE
        // ==========================================

        await page.setContent(`

            <html>

                <body>

                    <button id="getBooking">
                        Get Booking
                    </button>

                    <div id="result"></div>


                    <script>

                        document
                            .getElementById('getBooking')
                            .addEventListener(
                                'click',
                                async () => {

                                    const response =
                                        await fetch(
                                            'https://restful-booker.herokuapp.com/booking/1'
                                        );

                                    const data =
                                        await response.json();


                                    document
                                        .getElementById('result')
                                        .textContent =
                                            data.firstname +
                                            ' ' +
                                            data.lastname;
                                }
                            );

                    </script>

                </body>

            </html>
        `);


        // ==========================================
        // 3. CLICK BUTTON
        // ==========================================

        await page
            .getByRole('button', {
                name: 'Get Booking'
            })
            .click();


        // ==========================================
        // 4. VERIFY MOCKED RESPONSE
        // ==========================================

        await expect(
            page.locator('#result')
        ).toHaveText('Mock User');

    });

});

