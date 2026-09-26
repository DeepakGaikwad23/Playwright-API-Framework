import {
    test,
    expect
} from '../../fixtures/api.fixture';

import { BookingAPI } from '../../api/booking.api';

import { testData } from '../../utils/test-data';


test.describe('UPDATE Booking API Tests', () => {

    test('Update booking', async ({
        request,
        token
    }) => {

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
        // UPDATE BOOKING
        // ==============================

        const updateResponse =
            await bookingAPI.updateBooking(

                bookingId,

                testData.updatedBooking,

                token
            );


        // ==============================
        // VALIDATE STATUS
        // ==============================

        expect(updateResponse.status())
            .toBe(200);


        // ==============================
        // READ RESPONSE
        // ==============================

        const updateBody =
            await updateResponse.json();


        console.log(
            'Updated Booking:',
            updateBody
        );


        // ==============================
        // VALIDATE UPDATE
        // ==============================

        expect(updateBody.firstname)
            .toBe(
                testData.updatedBooking.firstname
            );

        expect(updateBody.lastname)
            .toBe(
                testData.updatedBooking.lastname
            );

        expect(updateBody.totalprice)
            .toBe(
                testData.updatedBooking.totalprice
            );

        expect(updateBody.depositpaid)
            .toBe(
                testData.updatedBooking.depositpaid
            );

        expect(
            updateBody.bookingdates.checkin
        ).toBe(
            testData.updatedBooking.bookingdates.checkin
        );

        expect(
            updateBody.bookingdates.checkout
        ).toBe(
            testData.updatedBooking.bookingdates.checkout
        );

        expect(updateBody.additionalneeds)
            .toBe(
                testData.updatedBooking.additionalneeds
            );


        // ==============================
        // GET BOOKING AFTER UPDATE
        // ==============================

        const getResponse =
            await bookingAPI.getBooking(
                bookingId
            );


        expect(getResponse.status())
            .toBe(200);


        const getBody =
            await getResponse.json();


        // ==============================
        // VERIFY UPDATE PERSISTED
        // ==============================

        expect(getBody.firstname)
            .toBe(
                testData.updatedBooking.firstname
            );

        expect(getBody.lastname)
            .toBe(
                testData.updatedBooking.lastname
            );

        expect(getBody.totalprice)
            .toBe(
                testData.updatedBooking.totalprice
            );

        expect(getBody.additionalneeds)
            .toBe(
                testData.updatedBooking.additionalneeds
            );

    });

});

