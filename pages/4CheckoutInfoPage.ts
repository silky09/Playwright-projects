import { Locator, Page } from "@playwright/test";

export default class CheckOutInfoPage {
    page: Page;
    checkOutHeaderText: Locator;
    enterFirstName: Locator;
    enterLastName: Locator;
    enterPostalCode: Locator;
    ContinueButton: Locator;
    
   
    
    constructor(page: Page) {
        this.page = page
        this.checkOutHeaderText = page.locator("//span[text()='Checkout: Your Information']");
        this.enterFirstName = page.locator("input#first-name");
        this.enterLastName = page.locator("input#last-name");
        this.enterPostalCode = page.locator("id=postal-code");
        this.ContinueButton = page.locator("id=continue");
    }


  
}
