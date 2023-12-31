import { Locator, Page } from "@playwright/test";

export default class CartPage {
    page: Page;
    verifySorting1: Locator;
    removeProduct: Locator;
    verifyCartAfterRemoving: Locator;
    ContinueShoppingButton: Locator;
    addNewProduct: Locator;
    checkOutButton: Locator;
    verifyHeaderTitle: Locator;
    newProductAdd: Locator;
   
    constructor(page: Page) {
       this.page = page
       this.verifySorting1 = page.locator("div.shopping_cart_container")
       this.removeProduct = page.locator("id=remove-sauce-labs-bike-light")
       this.verifyCartAfterRemoving = page.locator("div.shopping_cart_container")
       this.ContinueShoppingButton = page.locator("id=continue-shopping");
       this.checkOutButton = page.locator("id=checkout");
       this.verifyHeaderTitle = page.locator("span.title")
       this.newProductAdd = page.locator("#add-to-cart-sauce-labs-fleece-jacket")
    }
}
