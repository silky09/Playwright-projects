import { Locator, Page } from "@playwright/test";

export default class CartPage {
    page: Page;
    verifySorting1: Locator;
    removeProduct: Locator;
    verifyCartAfterRemoving: Locator;
    ContinueShopping: Locator;
    addNewProduct: Locator;
    checkout: Locator;
   
    constructor(page: Page) {
       this.page = page
       this.verifySorting1 = page.locator("div.shopping_cart_container")
       this.removeProduct = page.locator("id=remove-sauce-labs-bike-light")
       this.verifyCartAfterRemoving = page.locator("div.shopping_cart_container")
       this.ContinueShopping = page.locator("id=continue-shopping");
       this.checkout = page.locator("id=checkout");
    }
}
