const { test, expect } = require('@playwright/test');
const config = require('../config.json');

test('should not have console errors on the homepage', async ({ page }) => {
    const baseURL = process.env.BASE_URL || config.production;
    const consoleErrors = [];

    page.on('console', (msg) => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });

    await page.goto(baseURL);
    await page.goto(`${baseURL}/about`);
    expect(consoleErrors).toHaveLength(0);
});
