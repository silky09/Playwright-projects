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
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page)

  await page.goto(`${baseURL}`)
  await expect(page).toHaveURL(`${baseURL}`)  // Verify app URL
  await expect(page).toHaveTitle(testData.Swag_Labs) // Verify title of the page: Swag Labs

  const logo = await login.homePageLogo
  await expect(logo).toHaveText(testData.Swag_Labs) // verify header text as a logo
  await expect(logo).toBeVisible()
  await expect(logo).toContainText(testData.Swag)

  //?---------------------------------------------------------------------------------

  //1. Login page:  Enter username, Enter password and click Login button.


  const userName = await login.enterUserName;

  if ([await expect(userName).toBeEnabled()]) {
    userName.fill(testData.myUserName);
    await expect(userName).toHaveValue(testData.standard_user); // verify the input field having the same value or not.
  }


  const password = await login.enterPassword;

  if ([await expect(password).toBeEnabled()]) {
    password.fill(testData.myPassword);
  }

  const loginButton = await login.ClickLoginButton;
  if ([await expect(loginButton).toHaveAttribute("type", "submit")]) {    //we are expecting 'type' attributes and its 'value'
    await loginButton.click();
  }

  //?------------------------------------------------------------------------------------

  //2. Product page

  const headerTitle = await productPage.headerTitle;
  await expect(headerTitle).toHaveText(testData.Products);

  const sortingProducts = await productPage.sortingProducts;
  const sortingProduct_count = await productPage.sortingProduct_count
  await expect(sortingProduct_count).toHaveCount(4);   //verify dropdown list using .toHaveCount()
  await sortingProducts.click({ force: true });



  const verifySorting = await productPage.verifySorting //verify sorting
    .selectOption(testData.lohi)

  await productPage.addProduct1.click();  //Add products
  await productPage.addProduct2.click();


  //?---------------------------------------------------------------------------------------------

  //3. Cart Page: verify number of product in the cart, Remove product, reverify cart, click continue button shopping button to add new product



  const verifyCart1 = await cartPage.verifySorting1  // verify add to cart: number of products is 2
  if ([await expect(verifyCart1).toHaveText("2")]) {
    await verifyCart1.click();
  }


  const removeProduct = await cartPage.removeProduct   // remove the product

  if ([await expect(removeProduct).toHaveText(testData.Remove)]) {
    await cartPage.removeProduct.click();
  }

  const verifyCartAfterRemoving = await cartPage.verifyCartAfterRemoving  // verify number of products is 1 after removing
  await expect(verifyCartAfterRemoving).toHaveText("1");

  const ContinueShoppingButton = await cartPage.ContinueShoppingButton   // click on Continue shopping button to add new product:
  if ([await expect(ContinueShoppingButton).toContainText(testData.Continue_Shopping)]) {
    await ContinueShoppingButton.click();
  }


  if ([await expect(headerTitle).toHaveText(testData.Products)]) {  //verify inventory/product page and add new product
    await productPage.addNewProduct.click()
  }

  await verifyCart1.click();


  const checkOutButton = await cartPage.checkOutButton  // click on checkout button
  if ([await expect(checkOutButton).toHaveText(testData.Checkout)]) {
    await checkOutButton.click();
  }

  //?-------------------------------------------------------------


  // 4. checkoutInfo page: (EnterInformation)

  const checkOutHeaderText = await checkoutInfoPage.checkOutHeaderText
  await expect(checkOutHeaderText).toHaveText(testData.Checkout_Your_Information);

  const FirstName = await checkoutInfoPage.enterFirstName // enter firstName and verify
  if ([await expect(FirstName).toBeEnabled()]) {
    await FirstName.fill(testData.myFirstName);
    await expect(FirstName).toHaveValue(testData.myFirstName);
  }

  const LastName = await checkoutInfoPage.enterLastName // enter lastName and verify
  if ([await expect(LastName).toBeEnabled()]) {
    await LastName.fill(testData.myLastName);
    await expect(LastName).toHaveValue(testData.myLastName);
  }

  const PostalCode = await checkoutInfoPage.enterPostalCode  // enter postcode and verify
  if ([await expect(PostalCode).toBeEnabled()]) {
    await PostalCode.fill(testData.myPostalCode);
    await expect(PostalCode).toHaveValue(testData.myPostalCode);
  }

  const ContinueButton = await checkoutInfoPage.ContinueButton // click continue button
  if ([await expect(ContinueButton).toBeEnabled()]) {
    await ContinueButton.click();
  }


  //?---------------------------------------------------------------------------------

  // 5. Checkout Overview page: verify text "Checkout: Overview" and Total: $41.02

  const verifyOverviewText = await checkoutOverviewPage.verifyOverviewText
  await expect(verifyOverviewText).toHaveText(testData.Checkout_Overview);

  const verifyTotalPrice = await checkoutOverviewPage.verifyTotalPrice
  if ([await expect(verifyTotalPrice).toContainText("Total: $41.02")]) {
    await checkoutOverviewPage.FinishButton.click();
  }


  //?--------------------------------------------------------------------------

  // 6. Checkout Complete page: //verify text "Checkout: Complete!" and message: "Thank you for your order!"

  //checkoutCompletePage
  const verifyCheckoutCompleteText = await checkoutCompletePage.verifyCheckoutCompleteText
  await expect(verifyCheckoutCompleteText).toHaveText(testData.Checkout_Complete!);  // /Checkout: Complete!/

  const verifyConfirmOrder = await checkoutCompletePage.verifyConfirmOrder
  if ([await expect(verifyConfirmOrder).toContainText(testData.Thank_you_for_your_order!)]) {
    await checkoutCompletePage.BackHome_Button.click();
  }

})

