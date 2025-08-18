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
    const processorChkbox = await ai('Select processor option', aiArgs);
    await expect(page.locator('#product_attribute_75_5_31_96')).toBeChecked();
    //Click on Add to cart button
    await ai('Click on Add to cart button', aiArgs);
    await expect(page.locator('.bar-notification')).toContainText('The product has been added to your shopping cart');
    
});

test('Verify cart contents', async ({ page }) => {
    const aiArgs = {page,test};
    // Add product to cart before verifying
    await page.goto('https://demowebshop.tricentis.com/desktops');
    await ai('Click on the Simple computer product', aiArgs);
    await ai('Select processor option', aiArgs);
    await ai('Click on Add to cart button', aiArgs);
    await expect(page.locator('.bar-notification')).toContainText('The product has been added to your shopping cart');
    await page.goto('https://demowebshop.tricentis.com/cart');

     // Get the product name
    const productName = await ai('Get the produce name ', aiArgs);
    expect(productName).toEqual('Simple Computer');

    // Get the product price
    const productUnitPrice = await ai('Get the produce price ', aiArgs);
    expect(productUnitPrice).toEqual('800.00');

    // Get the product quantity input
    const productQty = await ai('Get the product quantity', aiArgs);
    expect(productQty).toEqual('1');
    
    // Verify cart contents
    const cartTotal = await ai('Get the cart Total', aiArgs);
    expect(cartTotal).toEqual('800.00');

    const termsOfServiceCheckbox = await ai('Click terms of service checkbox', aiArgs);
    await expect(page.locator('#termsofservice')).toBeChecked();

    // Choose the Country and State
    await ai('Select country as Germany', aiArgs);
    await expect(page.locator('select[name="CountryId"] >> option:checked')).toHaveText('Germany');
    
    // Select the state
    await ai('Select state as Other (Non US)', aiArgs);
    await expect(page.locator('select[name="StateProvinceId"] >> option:checked')).toHaveText('Other (Non US)');

    // Click on Checkout button
    const checkoutButton = await ai('Click on Checkout button', aiArgs);
    await expect(page).toHaveURL(/.*checkout/);
});

test('Remove product from cart', async ({ page }) => {
    const aiArgs = {page,test};
    // First, add the product to the cart
    await page.goto('https://demowebshop.tricentis.com/desktops');
    await ai('Click on the Simple computer product', aiArgs);
    await ai('Select processor option', aiArgs);
    await ai('Click on Add to cart button', aiArgs);
    await expect(page.locator('.bar-notification')).toContainText('The product has been added to your shopping cart');
    await page.goto('https://demowebshop.tricentis.com/cart');

    // Remove product from cart
    await ai('Change the product quantity to zero', aiArgs);
    const productQty = await page.locator('input[name^="itemquantity"]').inputValue();
    expect(productQty).toEqual('0');

});

test('Navigate to home page', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com/desktops');
    
    await ai('Click on the logo', aiArgs);
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.locator('.topic-html-content-header')).toHaveText('Welcome to our store');
    
});