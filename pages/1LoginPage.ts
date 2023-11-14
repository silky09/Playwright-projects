//import { Page, Locator } from "@playwright/test";

import { Locator, Page } from "@playwright/test";

class LoginPage {
    page: Page;
    homePageLogo: Locator;
    enterUserName: Locator;
    enterPassword: Locator;
    ClickLoginButton: Locator;
    

  

    constructor(page:Page) {
        this.page = page;
        this.homePageLogo = page.locator("div.login_logo");
        this.enterUserName = page.locator("id=user-name");
        this.enterPassword = page.locator('//input[@name="password"]');
        this.ClickLoginButton = page.locator("id=login-button");
        
      

}
    // creating methods to perform action: create a single function called login and add/call all the actions.
    // 
    
   /*  async Login(UserName, Password) {
      await this.userName.fill("standard_user")
      await this.password.fill("secret_sauce")
      await this.loginButton.click();
    } */
    


}




export default LoginPage