import {
    test,
    expect
} from '@playwright/test';

import { BookingAPI } from '../../api/booking.api';

import { testData } from '../../utils/test-data';


test.describe('Negative API Tests', () => {


    // ==========================================
    // INVALID AUTHENTICATION
    // ==========================================

    test(
        'Authentication with invalid credentials',
        async ({ request }) => {

            const response =
                await request.post('/auth', {

                    data: testData.invalidUser,

                    headers: {
                        'Content-Type':
                            'application/json'
                    }
                });


            expect(response.status())
                .toBe(200);


            const body =
                await response.json();


            console.log(
                'Invalid Auth:',
                body
            );


            expect(body.token)
                .toBeFalsy();

        }
    );


    // ==========================================
    // INVALID BOOKING ID
    // ==========================================

    test(
        'Get non-existing booking',
        async ({ request }) => {

            const bookingAPI =
                new BookingAPI(request);


            const invalidBookingId =
                999999999;


            const response =
                await bookingAPI.getBooking(
                    invalidBookingId
                );


            expect(response.status())
                .toBe(404);

        }
    );


    // ==========================================
    // NON-NUMERIC BOOKING ID
    // ==========================================

    test(
        'Get booking with invalid ID format',
        async ({ request }) => {

            const response =
                await request.get(
                    '/booking/abc'
                );


            expect(response.status())
                .toBe(404);

        }
    );


    // ==========================================
    // UPDATE WITHOUT TOKEN
    // ==========================================

    test(
        'Update booking without token',
        async ({ request }) => {

            const bookingAPI =
                new BookingAPI(request);


            const createResponse =
                await bookingAPI.createBooking(
                    testData.booking
                );


            expect(createResponse.status())
                .toBe(200);


            const createBody =
                await createResponse.json();


            const bookingId =
                createBody.bookingid;


            const response =
                await request.put(
                    `/booking/${bookingId}`,
                    {

                        headers: {

                            'Content-Type':
                                'application/json',

                            'Accept':
                                'application/json'
                        },

                        data:
                            testData.updatedBooking
                    }
                );


            expect(response.status())
                .toBe(403);

        }
    );


    // ==========================================
    // UPDATE WITH INVALID TOKEN
    // ==========================================

    test(
        'Update booking with invalid token',
        async ({ request }) => {

            const bookingAPI =
                new BookingAPI(request);


            const createResponse =
                await bookingAPI.createBooking(
                    testData.booking
                );


            const createBody =
                await createResponse.json();


            const bookingId =
                createBody.bookingid;


            const response =
                await bookingAPI.updateBooking(

                    bookingId,

                    testData.updatedBooking,

                    testData.invalidToken
                );


            expect(response.status())
                .toBe(403);

        }
    );


    // ==========================================
    // DELETE WITHOUT TOKEN
    // ==========================================

    test(
        'Delete booking without token',
        async ({ request }) => {

            const bookingAPI =
                new BookingAPI(request);


            const createResponse =
                await bookingAPI.createBooking(
                    testData.booking
                );


            const createBody =
                await createResponse.json();


            const bookingId =
                createBody.bookingid;


            const response =
                await request.delete(
                    `/booking/${bookingId}`
                );


            expect(response.status())
                .toBe(403);

        }
    );


    // ==========================================
    // DELETE WITH INVALID TOKEN
    // ==========================================

    test(
        'Delete booking with invalid token',
        async ({ request }) => {

            const bookingAPI =
                new BookingAPI(request);


            const createResponse =
                await bookingAPI.createBooking(
                    testData.booking
                );


            const createBody =
                await createResponse.json();


            const bookingId =
                createBody.bookingid;


            const response =
                await bookingAPI.deleteBooking(

                    bookingId,

                    testData.invalidToken
                );


            expect(response.status())
                .toBe(403);

        }
    );


    // ==========================================
    // MISSING REQUIRED FIELDS
    // ==========================================

    test(
        'Create booking with missing fields',
        async ({ request }) => {

            const response =
                await request.post(
                    '/booking',
                    {

                        headers: {

                            'Content-Type':
                                'application/json',

                            'Accept':
                                'application/json'
                        },

                        data: {
                            firstname: 'Deepak'
                        }
                    }
                );


            expect([400, 500])
                .toContain(
                    response.status()
                );

        }
    );


    // ==========================================
    // INVALID DATA TYPES
    // ==========================================

    test(
        'Create booking with invalid data types',
        async ({ request }) => {

            const response =
                await request.post(
                    '/booking',
                    {

                        headers: {

                            'Content-Type':
                                'application/json',

                            'Accept':
                                'application/json'
                        },

                        data:
                            testData.invalidBooking
                    }
                );


            expect([400, 500])
                .toContain(
                    response.status()
                );

        }
    );

});

