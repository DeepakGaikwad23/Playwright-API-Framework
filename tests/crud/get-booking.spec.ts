import { test, expect } from '@playwright/test';

import { BookingAPI } from '../../api/booking.api';

import { testData } from '../../utils/test-data';


test.describe('GET Booking API Tests', () => {

    test('Get booking by booking ID', async ({ request }) => {

        // ==============================
        // CREATE API OBJECT
        // ==============================

        const bookingAPI =
            new BookingAPI(request);


        // ==============================
        // CREATE BOOKING
        // ==============================

        const createResponse =
            await bookingAPI.createBooking(
                testData.booking
            );

        expect(createResponse.status())
            .toBe(200);


        // ==============================
        // GET BOOKING ID
        // ==============================

        const createBody =
            await createResponse.json();

        const bookingId =
            createBody.bookingid;


        console.log(
            'Booking ID:',
            bookingId
        );


        expect(bookingId)
            .toBeTruthy();


        // ==============================
        // GET BOOKING
        // ==============================

        const getResponse =
            await bookingAPI.getBooking(
                bookingId
            );


        // ==============================
        // VALIDATE STATUS
        // ==============================

        expect(getResponse.status())
            .toBe(200);


        // ==============================
        // READ RESPONSE
        // ==============================

        const getBody =
            await getResponse.json();


        console.log(
            'GET Response:',
            getBody
        );


        // ==============================
        // VALIDATE RESPONSE
        // ==============================

        expect(getBody.firstname)
            .toBe(testData.booking.firstname);

        expect(getBody.lastname)
            .toBe(testData.booking.lastname);

        expect(getBody.totalprice)
            .toBe(testData.booking.totalprice);

        expect(getBody.depositpaid)
            .toBe(testData.booking.depositpaid);

        expect(getBody.bookingdates.checkin)
            .toBe(
                testData.booking.bookingdates.checkin
            );

        expect(getBody.bookingdates.checkout)
            .toBe(
                testData.booking.bookingdates.checkout
            );

    });

});

