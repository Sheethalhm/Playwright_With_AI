# Playwright AI Framework

This project demonstrates AI-assisted testing using **Playwright** and the `@zerostep/playwright` package. It allows writing tests where AI can assist in generating actions, verifying elements, or providing suggestions for web interactions.

---

## Table of Contents
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Example Test](#example-test)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- AI-assisted actions with `@zerostep/playwright`.
- Full integration with Playwright Test Runner.
- Easy-to-read, maintainable test code.
- Supports headless and headed browser modes.

---

## Folder Structure
```
playwright-ai-framework/
│
├─ node_modules
├─ playwright-report
├─ tests/ # Test files
│ └─ demoOpenCartPhone.spec.js
├─ playwright.config.js # Playwright configuration
├─ package.json
├─ zerostep.config.json
└─ README.md
```

- **tests/**: Contains all your Playwright test files.
- **playwright.config.js**: Configuration file for browser, headless mode, and test options.
- **package.json**: Project dependencies and scripts.
- **README.md**: Project documentation.

---

## Installation

1. Ensure Node.js v18+ is installed.
2. Initialize the project:

```
npm init
```
3. Install Playwright and AI package:
```
npm install @playwright/test @zerostep/playwright
```
4. Install required browser binaries:
```
npx playwright install
```
## Setup
- Create a playwright.config.js if it doesn’t exist:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        headless: false, 
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
    },
});
```
- Optional: Add test scripts to package.json:
```
"scripts": {
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed"
}
```
## Usage
- Run all tests:
```
npm test
```
- Run tests in headed mode (for debugging):
```
npm run test:headed
```
- Use AI-assisted actions in your test files by importing:
```
import { ai } from '@zerostep/playwright';
```

## Example Test
```
import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';

test('AI Test capability', async ({ page }) => {
    const aiArgs = { page, test };
    await page.goto('https://demowebshop.tricentis.com/desktops');
    
    await ai('Click on the first product', aiArgs, async () => {
        const firstProduct = await page.locator('.product-item').first();
        await firstProduct.click();
        await expect(page).toHaveURL(/.*desktops/);
        await expect(page.locator('.product-name')).toHaveText('Build your own computer');
    });
});

- How it works? 
-- ai() wraps actions you want AI assistance for.
-- aiArgs passes page and test to the AI.
-- The callback contains the actual Playwright interactions and assertions.
```

## Best Practices
- Keep AI actions small – Each ai() call should handle one clear task.
- Use locators wisely – Prefer .locator() over page.$() for reliability.
- Combine with Playwright assertions – AI can perform actions, but always assert the expected results.
- Debug in headed mode – Use headless: false to visually verify AI interactions.
- Organize tests by feature – Keep tests in separate files based on functionality.
- Screenshots (Optional) - You can capture screenshots during tests:
```
await page.screenshot({ path: 'screenshots/product.png', fullPage: true });
```

## Contributing
- Fork the repository.
- Create a feature branch.
- Submit a pull request with clear descriptions.
- Follow Playwright testing conventions.

## License
This project is licensed under the MIT License.