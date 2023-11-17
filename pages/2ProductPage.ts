import { Locator, Page } from "@playwright/test";

export default class ProductPage {
    page: Page;
    headerTitle: Locator;
    sortingProducts: Locator;
    sortingProduct_count: Locator;
    verifySorting: Locator;
    addProduct1: Locator;
    addProduct2: Locator;
    addNewProduct: Locator;
   
    constructor(page: Page) {
        this.page = page;
        this.headerTitle = page.locator("span.title")
        this.sortingProducts = page.locator("//span[text()='Name (A to Z)']")
        this.sortingProduct_count = page.locator("select[class='product_sort_container'] option");
        this.verifySorting = page.locator("//select[@data-test='product_sort_container']")
        this.addProduct1 = page.locator("id=add-to-cart-sauce-labs-onesie");
        this.addProduct2 = page.locator("id=add-to-cart-sauce-labs-bike-light");
        this.addNewProduct = page.locator("id=add-to-cart-sauce-labs-backpack")
        

    }
}
