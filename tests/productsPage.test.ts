import { test, expect } from "@playwright/test";


test('ProductPage', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html')
    await expect(page).toHaveScreenshot()
})
