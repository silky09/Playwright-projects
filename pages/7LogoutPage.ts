import { Locator, Page } from "@playwright/test";

export default class LogoutPage {
    page: Page;
    HamburgerMenu: Locator;
    LogoutButton: Locator;

    constructor(page:Page) {
       this.page = page;
       this.HamburgerMenu = page.locator("#react-burger-menu-btn");
       this.LogoutButton = page.locator("a#logout_sidebar_link");
    }
}

