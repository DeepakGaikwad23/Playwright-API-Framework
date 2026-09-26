import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
    path: `config/${process.env.ENV || 'qa'}.env`
});

export default defineConfig({

    testDir: './tests',

    timeout: 30000,

    fullyParallel: true,

    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    use: {
        baseURL: process.env.BASE_URL,

        extraHTTPHeaders: {
            'Accept': 'application/json'
        }
    }
});