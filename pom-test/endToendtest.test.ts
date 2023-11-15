import { test, expect } from "@playwright/test"
import fs from "fs" //file system
import LoginPage from "../pages/1LoginPage"
import ProductPage from "../pages/2ProductPage"
import CartPage from "../pages/3CartPage"
import CheckoutInfoPage from "../pages/4CheckoutInfoPage"
import CheckoutOverviewPage from "../pages/5CheckoutOverviewPage"
import CheckoutCompletePage from "../pages/6CheckoutCompletePage"

const testData = JSON.parse(fs.readFileSync(`./pom-test/testData/data.json`, `utf-8`))

test("LoginUser", async ({ page, baseURL }) => {

  const login = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutInfoPage = new CheckoutInfoPage(page);


  await page.goto(`${baseURL}`)

  // 1.Verify app URL
  await expect(page).toHaveURL(`${baseURL}`)

  // 2. Verify title of the page: Swag Labs
  await expect(page).toHaveTitle(testData.Swag_Labs)

  //verify header text as a logo
  //const logo = await page.locator("div.login_logo")
  const logo = await login.homePageLogo
  await expect(logo).toHaveText(testData.Swag_Labs)
  await expect(logo).toBeVisible()
  await expect(logo).toContainText(testData.Swag)


  //1. Login page:

  //Enter username
  const userName = await login.enterUserName;

  if ([await expect(userName).toBeEnabled()]) {
    userName.fill(testData.myUserName);
    await expect(userName).toHaveValue(testData.standard_user); //verify the input field having the same value or not.
  }


  //Enter password
  const password = await login.enterPassword;

  if ([await expect(password).toBeEnabled()]) {
    password.fill(testData.myPassword);
  }


  //click Login button

  const loginButton = await login.ClickLoginButton;
  if ([await expect(loginButton).toHaveAttribute("type", "submit")]) {
    //we are expecting 'type' attributes and its 'value'
    await loginButton.click();
  }

  //2. Product page

  const headerTitle = await productPage.headerTitle;
  await expect(headerTitle).toHaveText(testData.Products);

  //verify dropdown list using .toHaveCount()

  const sortingProducts = await productPage.sortingProducts;
  const sortingProduct_count = await productPage.sortingProduct_count
  await expect(sortingProduct_count).toHaveCount(4);
  await sortingProducts.click({ force: true });


  //verify sorting
  const verifySorting = await productPage.verifySorting
  .selectOption("lohi")

  

  //ADD PRODUCTs
  await productPage.addProduct1.click();
  await productPage.addProduct2.click();

  

  //3. Cart Page

  
  //verify add to cart number of products is 2
  const verifyCart1 = await cartPage.verifySorting1

  if ([await expect(verifyCart1).toHaveText("2")]) {
    await verifyCart1.click();
  }

    // remove the product
    const removeProduct = await cartPage.removeProduct

    if ([await expect(removeProduct).toHaveText(testData.Remove)]) {
      await cartPage.removeProduct.click();
    }

      //verify add to cart number of products is 1
  const verifyCartAfterRemoving = await cartPage.verifyCartAfterRemoving
  await expect(verifyCartAfterRemoving).toHaveText("1");

  //click on Continue shopping to add new product:

  const ContinueShopping = await cartPage.ContinueShopping
  if ([await expect(ContinueShopping).toContainText(testData.Continue_Shopping)]) {
    await ContinueShopping.click();
  }

  //verify inventory page and add new product:
  if ([await expect(headerTitle).toHaveText(testData.Products)]) {
    await productPage.addNewProduct.click()
  }

  await verifyCart1.click();

   //click on checkout button
   const checkOutButton = await cartPage.checkOutButton
   if ([await expect(checkOutButton).toHaveText(testData.Checkout)]) {
     await checkOutButton.click();
   }

    // checkout page:

  //EnterInformation in checkout page:
  const checkOutHeaderText = await checkoutInfoPage.checkOutHeaderText
  await expect(checkOutHeaderText).toHaveText("Checkout: Your Information");

  const FirstName = await checkoutInfoPage.enterFirstName
  if ([await expect(FirstName).toBeEnabled()]) {
    await FirstName.fill(testData.myFirstName);
  
    await expect(FirstName).toHaveValue(testData.myFirstName);
  }

  const LastName = await checkoutInfoPage.enterLastName
  if ([await expect(LastName).toBeEnabled()]) {
    await LastName.fill(testData.myLastName);
    await expect(LastName).toHaveValue(testData.myLastName);
  }

  const PostalCode = await checkoutInfoPage.enterPostalCode
  if ([await expect(PostalCode).toBeEnabled()]) {
    await PostalCode.fill(testData.myPostalCode);
  }

  const ContinueButton = await checkoutInfoPage.ContinueButton
  if ([await expect(ContinueButton).toBeEnabled()]) {
    await ContinueButton.click();
  }


})

