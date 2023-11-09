import { test, expect } from '@playwright/test';
import exp from 'constants';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

   // 1.Verify app URL
   await expect(page).toHaveURL('https://www.saucedemo.com/')

   // 2. Verify title of the page: Swag Labs
   await expect(page).toHaveTitle('Swag Labs')

   //verify header text as a logo
   const logo = await page.locator('div.login_logo')
   await expect(logo).toHaveText('Swag Labs')  //Verify complete text of the element
   await expect(logo).toBeVisible()  //Verify header text/element (logo) is visible or not 
   await expect(logo).toContainText('Swag') // verify partial text
  

  //Login page:

  //Enter username
  const userName = await page.locator('id=user-name')

   if ([await expect(userName).toBeEnabled()]) {
     userName.fill('standard_user')
     await expect(userName).toHaveValue('standard_user') //verify the input field having the same value or not.
   }

//Enter password
   const password = await page.locator('//input[@name="password"]')

   if ([await expect(password).toBeEnabled()]) {
    password.fill('secret_sauce')
   }

//click Login button

const loginButton = await page.locator('id=login-button')
if ([await expect(loginButton).toHaveAttribute('type', 'submit')]) {  //we are expecting 'type' attributes and its 'value'
  await loginButton.click()
}

// Product page:    
const headerTitle = await page.locator("span.title")
await expect(headerTitle).toHaveText('Products')

 //Visual validation using toHaveScreenshot()
 //await expect(page).toHaveScreenshot()
 
 //const sortingProducts = await page.locator("select[class='product_sort_container'] option").click();
 //verify dropdown list using .toHaveCount()
 const sortingProducts1 = await page.locator ("//span[text()='Name (A to Z)']")
 const sortingProducts2 = await page.locator("select[class='product_sort_container'] option")
 await expect(sortingProducts2).toHaveCount(4)
 
 await sortingProducts1.click({force:true})
 //await page.pause()
 const sorting =  await page.locator("//select[@data-test='product_sort_container']").selectOption('lohi')
 
// Add to cart: cart page

  
  const product1 = await page.locator('id=add-to-cart-sauce-labs-onesie')
  await product1.click()
  const product2 = await page.locator('id=add-to-cart-sauce-labs-bike-light')
  await product2.click()
  
//verify add to cart number of products is 2
  const verifySorting1 = await page.locator("div.shopping_cart_container")

  if ([await expect(verifySorting1).toHaveText('2')]) {
    await verifySorting1.click()
  }
  
  

  // remove the product
  const removeProduct = await page.locator('id=remove-sauce-labs-bike-light')
  
  if ([await expect(removeProduct).toHaveText('Remove')]) {
    await removeProduct.click()
  }
  
  //verify add to cart number of products is 1 
  const verifySorting2 = await page.locator("div.shopping_cart_container")
  await expect(verifySorting2).toHaveText('1')

  //click on Continue shopping:
 
  const ContinueShopping = await page.locator('id=continue-shopping')
  if ([await expect(ContinueShopping).toContainText('Continue Shopping')]) {
    await ContinueShopping.click()
  }

  //verify inventory page and add the product: id=add-to-cart-sauce-labs-backpack
  if ([await expect(headerTitle).toHaveText('Products')]) {
    await page.locator('id=add-to-cart-sauce-labs-backpack').click()
  }

  await verifySorting1.click()
 

  //click on checkout button
  const checkOut = await page.locator('id=checkout')
  if ([await expect(checkOut).toHaveText('Checkout')]) {
    await checkOut.click()
  }

  // checkout page
  //EnterInformation in checkout page:
  const enterInfo = await page.locator("//span[text()='Checkout: Your Information']")
  await expect(enterInfo).toHaveText('Checkout: Your Information') 
   
   
   
  const FirstName = await page.locator('input#first-name')
 if ([await expect(FirstName).toBeEnabled()]) {
    await FirstName.click()
    await FirstName.fill('Silk')
    //await FirstName.fill('Silk') //pressSequentially() 
    //In most cases, you should use locator.fill(value[, options]) instead. You only need to press keys one by one if there is special keyboard handling on the page - 
    //in this case use locator.pressSequentially(text, {delay:200}]).
    await expect(FirstName).toHaveValue('Silk')
    
 }   
 
 const LastName = await page.locator('input#last-name')
  if ([await expect(LastName).toBeEnabled()]) {
    await LastName.click()
    await LastName.fill("San")
    await expect(LastName).toHaveValue('San')
  }

  const PostalCode = await page.locator('id=postal-code')
  if ([await expect(PostalCode).toBeEnabled()]) {
    await PostalCode.fill("123456")
  }
  

  const ContinueButton = await page.locator("id=continue")
  if ([await expect(ContinueButton).toBeEnabled()]) {
    await ContinueButton.click()
  }

//checkout overview page:

//verify text "Checkout: Overview" and Total: $41.02

const verifyOverviewText = await page.locator(".title")
await expect(verifyOverviewText).toHaveText(/Checkout: Overview/)

const verifyTotalPrice = await page.locator("//div[text()='Total: $']")
if ([await expect(verifyTotalPrice).toContainText("Total: $41.02")]) {
   await page.locator("id=finish").click()
}


//checkout complete page:
//verify text "Checkout: Complete!" and message: "Thank you for your order!"

const verifyCheckoutCompleteText = await page.locator("span.title")
await expect(verifyCheckoutCompleteText).toHaveText(/Checkout: Complete!/)

const verifyConfirmOrder = await page.locator("h2.complete-header")
if ([await expect(verifyConfirmOrder).toContainText("Thank you for your order!")]) {
   await page.locator("id=back-to-products").click()
}

//Inventory page: Hamburger menu >> Logout

const clickHambergerMenu = await page.locator("#react-burger-menu-btn")
if ([await expect(clickHambergerMenu).toBeVisible()]) {
    await clickHambergerMenu.click()
}

//verify text: Logout

const ClickLogout = await page.locator("a#logout_sidebar_link")
if ([await expect(ClickLogout).toHaveText("Logout")]) {
    await ClickLogout.click()
}

});