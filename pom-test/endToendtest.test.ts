import { test, expect } from "@playwright/test"
import LoginPage  from "../pages/1LoginPage"
import ProductPage from "../pages/2ProductPage"
import CartPage from "../pages/3CartPage"
import CheckoutInfoPage from "../pages/4CheckoutInfoPage"
import CheckoutOverviewPage from "../pages/5CheckoutOverviewPage"
import CheckoutCompletePage from "../pages/6CheckoutCompletePage"

test("LoginUser", async ({ page, baseURL }) => {
    
 const login = new LoginPage(page); 
  await page.goto(`${baseURL}`)

  // 1.Verify app URL
  await expect(page).toHaveURL(`${baseURL}`)

  // 2. Verify title of the page: Swag Labs
  await expect(page).toHaveTitle("Swag Labs")

  //verify header text as a logo
  //const logo = await page.locator("div.login_logo")
  const logo = await login.homePageLogo
  await expect(logo).toHaveText("Swag Labs")
  await expect(logo).toBeVisible()
  await expect(logo).toContainText("Swag")


    //Login page:

  //Enter username
  const userName = await login.enterUserName;

  if ([await expect(userName).toBeEnabled()]) {
    userName.fill("standard_user");
    await expect(userName).toHaveValue("standard_user"); //verify the input field having the same value or not.
  }


   //Enter password
   const password = await login.enterPassword;

   if ([await expect(password).toBeEnabled()]) {
     password.fill("secret_sauce");
   }
 

    //click Login button

  const loginButton = await login.ClickLoginButton;
  if ([await expect(loginButton).toHaveAttribute("type", "submit")]) {
    //we are expecting 'type' attributes and its 'value'
    await loginButton.click();
  }

  //await page.pause()

})