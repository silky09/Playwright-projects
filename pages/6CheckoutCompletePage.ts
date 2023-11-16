import { Locator, Page } from "@playwright/test";

export default class CheckoutCompletePage {
    page: Page;
    verifyCheckoutCompleteText: Locator;
    verifyConfirmOrder: Locator;
    BackHome_Button: Locator;
   
    constructor(page: Page) {
        this.page = page
        this.verifyCheckoutCompleteText = page.locator("span.title");
        this.verifyConfirmOrder = page.locator("h2.complete-header");
        this. BackHome_Button = page.locator("id=back-to-products")
        
    }
}
