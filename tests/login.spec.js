import { test, expect } from '@playwright/test';
import { ai } from "@zerostep/playwright";

test('Login into the website', async ({ page }) => {
    const aiArgs = {page,test};
    await page.goto('https://demowebshop.tricentis.com');
    
    await ai('Click on the Log in link', aiArgs);
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
    await ai('Enter "sheethalhm@gmail.com" as Email', aiArgs);
    await ai('Enter "demo123" as Password', aiArgs);
    await ai('Click on the Log in button', aiArgs);
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.locator('.topic-html-content-header')).toHaveText('Welcome to our store');
    await ai('Click on the Log out link', aiArgs);
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');

});