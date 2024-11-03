const { test, expect } = require('@playwright/test');
const config = require('../config.json');

test('should allow a user to log in', async ({ page }) => {
    const baseURL = process.env.BASE_URL || config.production;
    await page.goto(`${baseURL}/login.html`);

    await page.fill('input[name="username"]', 'demouser');
    await page.fill('input[name="password"]', 'fashion123');
    await page.click('button[type="submit"]');

    await page.waitForNavigation();
    const successMessage = await page.locator('h1'); // This is a placeholder. It can be adjusted if needed based on the locator
    await expect(successMessage).toHaveText('Welcome, demouser'); // This is also just a placeholder. It could be adjusted, if needed
});
