const { test, expect } = require('@playwright/test');
import { ai } from "@zerostep/playwright";

test('Click on First product', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com/desktops');
    await ai('Click on the Simple computer product', aiArgs);
    await expect(page).toHaveURL(/.*simple-computer/);
    
    // Get the product name
    const productName = await ai('Get the produce name ', aiArgs);
    expect(productName).toEqual('Simple Computer');

    // Get the product price
    const productPrice = await ai('Get the produce price ', aiArgs);
    expect(productPrice).toEqual('800.00');

    // Get the product quantity input
    const productQty = await ai('Get the produce quantity input', aiArgs);
    expect(productQty).toEqual('1');

})


test('Add product to cart', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com/desktops');
    await ai('Click on the Simple computer product', aiArgs);
    await expect(page).toHaveURL(/.*simple-computer/);
    // Select a processor option before adding to cart
    await ai('Select processor option', aiArgs);
    await expect(page.locator('#product_attribute_75_5_31_96')).toBeChecked();
    //Click on Add to cart button
    await ai('Click on Add to cart button', aiArgs);
    await expect(page.locator('.bar-notification')).toContainText('The product has been added to your shopping cart');
    
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