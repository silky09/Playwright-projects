import { test, expect } from "@playwright/test";
import exp from "constants";


test('verify RadioButton', async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');
    await expect(page).toHaveURL('https://demoqa.com/radio-button')
    await expect(page).toHaveTitle('DEMOQA')
    await page.pause()
// verify radio button is checked or not: first need bto locate the elements using locator method

  const radioButton = await page.locator('id=impressiveRadio')
    await radioButton.click({force: true})
    await expect(radioButton).toBeChecked()

    //const message = await page.locator("//span[text()='Impressive']") //span.text-success
    //Verify message: "Impressive"
    const message1 = await page.locator("span.text-success")
    await expect(message1).toHaveText('Impressive')
    
    
})

test('Verify Checkbox', async ({ page }) => {
   await page.goto('https://demoqa.com/checkbox')
   await expect(page).toHaveURL('https://demoqa.com/checkbox')
   await page.pause()

   //Verify header text: Check Box
   const header = await page.locator("//div[text()='Check Box']")
   if ([await expect(header).toHaveText(/Check Box/)]) {
    await header.click()
   }

   //verify icon/toggle is clickable or not
   const iconClick = await page.locator("button[title='Toggle']")
   if ([await expect(iconClick).toBeEnabled()]) {
    await iconClick.click()
   }
    //await page.waitForTimeout(12000)
   await page.pause()

   //verify and select Desktop's list checkbox
   //(//button[@title='Toggle'])[2]
   const desktopToggle = await page.locator("(//button[@title='Toggle'])[2]")
   if ([await expect(desktopToggle).toBeEnabled()]) {
    await desktopToggle.click()
   }
   const selectNotes = await page.locator("//span[text()='Notes']")
   await selectNotes.click()
   await expect(selectNotes).toBeChecked()

   //verify message: "You have selected :notes"
   const message2 = await page.locator("id=result")
   await expect(message2).toHaveText('You have selected :notes')

})

