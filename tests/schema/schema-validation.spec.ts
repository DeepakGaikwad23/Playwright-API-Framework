import { test, expect } from '@playwright/test';
import { BookingAPI } from '../../api/booking.api';
import { validateSchema } from '../../utils/schema-validator';
import bookingSchema from '../../data/schemas/booking.schema.json';

test.describe('API Schema Validation Tests', () => {

    test('Validate booking response against JSON schema', async ({ request }) => {

        // Create Booking API object
        const bookingAPI = new BookingAPI(request);

        // Get booking
        const response =
            await bookingAPI.getBooking(1);

        // Validate status code
        expect(response.status()).toBe(200);

        // Read response body
        const responseBody =
            await response.json();

        console.log(
            'Booking Response:',
            responseBody
        );

        // Validate JSON schema
        const isValid =
            validateSchema(
                responseBody,
                bookingSchema
            );

        // Schema must be valid
        expect(isValid).toBeTruthy();

    });

});

