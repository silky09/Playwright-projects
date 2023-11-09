import { test, expect } from "@playwright/test"
import LoginPage  from "../pages/1LoginPage"
import ProductPage from "../pages/2ProductPage"
import CartPage from "../pages/3CartPage"
import CheckoutInfoPage from "../pages/4CheckoutInfoPage"
import CheckoutOverviewPage from "../pages/5CheckoutOverviewPage"
import CheckoutCompletePage from "../pages/6CheckoutCompletePage"

test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/")

  // 1.Verify app URL
  await expect(page).toHaveURL("https://www.saucedemo.com/")

  // 2. Verify title of the page: Swag Labs
  await expect(page).toHaveTitle("Swag Labs")

  //verify header text as a logo
  const logo = await page.locator("div.login_logo")
  await expect(logo).toHaveText("Swag Labs") //Verify complete text of the element
  await expect(logo).toBeVisible(); //Verify header text/element (logo) is visible or not
  await expect(logo).toContainText("Swag") // verify partial text


})