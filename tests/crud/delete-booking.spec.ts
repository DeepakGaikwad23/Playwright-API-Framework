import {
    test,
    expect
} from '../../fixtures/api.fixture';

import { BookingAPI } from '../../api/booking.api';

import { testData } from '../../utils/test-data';


test.describe('DELETE Booking API Tests', () => {

    test('Delete booking', async ({
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
        // VERIFY BOOKING EXISTS
        // ==============================

        const getResponse =
            await bookingAPI.getBooking(
                bookingId
            );


        expect(getResponse.status())
            .toBe(200);


        // ==============================
        // DELETE BOOKING
        // ==============================

        const deleteResponse =
            await bookingAPI.deleteBooking(

                bookingId,

                token
            );


        console.log(
            'Delete Status:',
            deleteResponse.status()
        );


        expect(deleteResponse.status())
            .toBe(201);


        // ==============================
        // VERIFY DELETION
        // ==============================

        const getAfterDeleteResponse =
            await bookingAPI.getBooking(
                bookingId
            );


        console.log(
            'GET After Delete:',
            getAfterDeleteResponse.status()
        );


        expect(
            getAfterDeleteResponse.status()
        ).toBe(404);

    });

});

