import { test, expect } from "@playwright/test";
import exp from "constants";
import { setTimeout } from "timers/promises";



test('Login test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
   await page.pause()
    // 1.Verify app URL
    await expect(page).toHaveURL('https://www.saucedemo.com/')

    // 2. Verify title of the page: Swag Labs
    await expect(page).toHaveTitle('Swag Labs')
    
    //to verify these assertions, first i need to Locate the element: page.locator() then check the element is visible or not
    const logo = await page.locator('div.login_logo')
    await expect(logo).toHaveText('Swag Labs')  //Verify complete text of the element
    await expect(logo).toBeVisible()  //Verify header text/element (logo) is visible or not 
    await expect(logo).toContainText('Swag') // verify partial text
  
    //locators: ID 
    //verify element is enabled or not: apply condition: if input box is enabled then fill the value.

    const userName = await page.locator('id=user-name')

   if ([await expect(userName).toBeEnabled()]) {
     userName.fill('problem_user')
   }
    
    //await page.locator('[id="password"]').fill('secret_sauce')

    //Using Xpath: //input[@name='password']
   const password = await page.locator('//input[@name="password"]')

   if ([await expect(password).toBeEnabled()]) {
    password.fill('secret_sauce')
   }
   

    //using CSS selector:  #login-button is enabled or not using attribute method, it checks element has attributes (type, name, id, class, xpath) or not,  click({force: true})
    const loginButton = await page.locator('id=login-button')
    if ([await expect(loginButton).toHaveAttribute('type', 'submit')]) {  //we are expecting 'type' attributes and its 'value'
      await loginButton.click()
    }

})



