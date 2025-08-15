const { test, expect } = require('@playwright/test');
import { ai } from "@zerostep/playwright";

test('AI Test capability', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com/desktops');
    await ai('Click on the first product', aiArgs , async () => {

        const firstProduct = await page.locator('.product-item').first();
        await firstProduct.click();
        await expect(page).toHaveURL(/.*desktops/);
        await expect(page.locator('.product-name')).toHaveText('Build your own computer');
    });

});
