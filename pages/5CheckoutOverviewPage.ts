import { Locator, Page } from "@playwright/test";

export default class CheckoutOverviewPage {
    page: Page;
    verifyOverviewText: Locator;
    verifyTotalPrice: Locator;
    FinishButton: Locator;
   
    constructor(page: Page) {
        this.page = page
        this.verifyOverviewText = page.locator(".title");
        this.verifyTotalPrice = page.locator("//div[text()='Total: $']");
        this.FinishButton = page.locator("id=finish")



    }
}
