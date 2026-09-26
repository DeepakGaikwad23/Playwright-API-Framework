import {
    APIRequestContext
} from '@playwright/test';

export class BookingAPI {

    constructor(
        private request: APIRequestContext
    ) {}

    async createBooking(data: any) {

        return await this.request.post('/booking', {

            data,

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    async getBooking(id: number) {

        return await this.request.get(`/booking/${id}`);
    }

    async getBookings() {

        return await this.request.get('/booking');
    }

    async updateBooking(
        id: number,
        data: any,
        token: string
    ) {

        return await this.request.put(
            `/booking/${id}`,

            {
                data,

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': `token=${token}`
                }
            }
        );
    }

    async deleteBooking(
        id: number,
        token: string
    ) {

        return await this.request.delete(
            `/booking/${id}`,

            {
                headers: {
                    'Cookie': `token=${token}`
                }
            }
        );
    }
}