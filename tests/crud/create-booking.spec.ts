import { test, expect } from '@playwright/test';
import { BookingAPI } from '../../api/booking.api';
import bookingData from '../../data/bookingData.json';

test('Create booking', async ({ request }) => {

    const bookingAPI = new BookingAPI(request);

    const response =
        await bookingAPI.createBooking(bookingData);

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

    expect(body.bookingid).toBeTruthy();

    expect(body.booking.firstname)
        .toBe('Deepak');

    expect(body.booking.lastname)
        .toBe('Gaikwad');
});