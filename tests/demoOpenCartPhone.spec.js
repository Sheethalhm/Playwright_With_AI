const { test, expect } = require('@playwright/test');
import { ai } from "@zerostep/playwright";

test('Click on First product', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com/desktops');
    await ai('Click on the first product', aiArgs , async () => {

        const firstProduct = await page.locator('.product-item').first();
        await firstProduct.click();
        await expect(page).toHaveURL(/.*desktops/);
        await expect(page.locator('.product-name')).toHaveText('Build your own cheap computer');
        await ai('Verify product details', aiArgs, async () => {
            await expect(page.locator('.sku')).toHaveText('SKU: 1');
            await expect(page.locator('.price')).toHaveText('$1,200.00');
            await expect(page.locator('.product-quantity input')).toHaveValue('1');
        })
    });
});

test('Add product to cart', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com/desktops');
    await ai('Add product to cart', aiArgs, async () => {
        const firstProduct = await page.locator('.product-item').first();
        await firstProduct.click();
        await expect(page).toHaveURL(/.*desktops/);
        await page.locator('.add-to-cart-button').click();
        await expect(page.locator('.bar-notification')).toContainText('The product has been added to your shopping cart');
    });
});

test('Verify cart contents', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com/cart');
    await ai('Verify cart contents', aiArgs, async () => {
        await expect(page.locator('.cart-item')).toHaveCount(1);
        await expect(page.locator('.product-name')).toHaveText('Build your own cheap computer');
        await expect(page.locator('.quantity input')).toHaveValue('1');
        await expect(page.locator('.subtotal')).toHaveText('$800.00');
    });
});

test('Remove product from cart', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com/cart');
    await ai('Remove product from cart', aiArgs, async () => {
        await expect(page.locator('.cart-item')).toHaveCount(1);
        await page.locator('.remove-from-cart').click();
        await expect(page.locator('.cart-item')).toHaveCount(0);
        await expect(page.locator('.bar-notification')).toContainText('The item has been removed from your shopping cart');
    });
});

test('Verify empty cart', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com/cart');
    await ai('Verify empty cart', aiArgs, async () => {
        await expect(page.locator('.cart-item')).toHaveCount(0);
        await expect(page.locator('.no-data')).toHaveText('Your Shopping Cart is empty!');
    });
});

test('Search for product', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com/');
    await ai('Search for product', aiArgs, async () => {
        await page.locator('#small-searchterms').fill('Build your own computer');
        await page.locator('.search-box-button').click();
        await expect(page).toHaveURL(/.*search/);
        await expect(page.locator('.product-item')).toHaveCount(1);
        await expect(page.locator('.product-title a')).toHaveText('Build your own computer');
        await expect(page.locator('.product-price')).toHaveText('$1,200.00');   
    });
});

test('Navigate to home page', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com/desktops');
    await ai('Navigate to home page', aiArgs, async () => {
        await page.locator('.header-logo a').click();
        await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
        await expect(page.locator('.topic-html-content-header')).toHaveText('Welcome to our store');
    });
});