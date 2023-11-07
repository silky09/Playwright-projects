import { test, expect } from '@playwright/test';
import exp from 'constants';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  //Login page:

  //Enter username
  const userName = await page.locator('id=user-name')

   if ([await expect(userName).toBeEnabled()]) {
     userName.fill('problem_user')
     await expect(userName).toHaveValue('problem_user') //verify the input field having the same value or not.
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
 const sortingProducts1 = await page.locator ("//span[text()='Name (A to Z)']")
 const sortingProducts2 = await page.locator("select[class='product_sort_container'] option")
 await expect(sortingProducts2).toHaveCount(4)
 
 await sortingProducts1.click({force:true})
 await page.pause()
 const sorting =  await page.locator("//select[@data-test='product_sort_container']").selectOption('lohi')
 
// Add to cart

  
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
  await page.pause()

  //click on checkout button: id=checkout
  const checkOut = await page.locator('id=checkout')
  if ([await expect(checkOut).toHaveText('Checkout')]) {
    await checkOut.click()
  }

  
});