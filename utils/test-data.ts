export const testData = {

    // ==========================================
    // AUTHENTICATION
    // ==========================================

    validUser: {

        username: 'admin',

        password: 'password123'
    },


    invalidUser: {

        username: 'invalidUser',

        password: 'invalidPassword'
    },


    // ==========================================
    // BOOKING
    // ==========================================

    booking: {

        firstname: 'Deepak',

        lastname: 'Gaikwad',

        totalprice: 1500,

        depositpaid: true,

        bookingdates: {

            checkin: '2026-10-01',

            checkout: '2026-10-05'
        },

        additionalneeds: 'Breakfast'
    },


    // ==========================================
    // UPDATED BOOKING
    // ==========================================

    updatedBooking: {

        firstname: 'Rahul',

        lastname: 'Sharma',

        totalprice: 2500,

        depositpaid: true,

        bookingdates: {

            checkin: '2026-11-01',

            checkout: '2026-11-10'
        },

        additionalneeds: 'Lunch'
    },


    // ==========================================
    // INVALID DATA
    // ==========================================

    invalidBooking: {

        firstname: 12345,

        lastname: true,

        totalprice: 'invalid-price',

        depositpaid: 'yes',

        bookingdates: {

            checkin: 123,

            checkout: true
        }
    },


    // ==========================================
    // INVALID TOKEN
    // ==========================================

    invalidToken: 'invalid-token-12345'

};

