const { test, expect } = require('@playwright/test');
const config = require('../config.json');

test('this will check the status for all links on the given homepage', async ({ page }) => {
    const baseURL = process.env.BASE_URL || config.production;
    await page.goto(baseURL);

    const links = await page.$$eval('a[href]', anchors => anchors.map(a => a.href));
    for (const link of links) {
        const response = await page.goto(link);
        expect(response.status()).toBeLessThan(400);
    }
});
