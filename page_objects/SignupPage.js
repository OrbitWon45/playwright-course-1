import { expect } from "@playwright/test"

export class SignupPage {
    constructor(page) {
        this.page = page

        this.emailField = page.getByRole('textbox', { name: 'E-Mail' })
        this.passwordField = page.locator('input[placeholder="Password"]')
        this.registerBTN = page.locator('button[type="submit"]')
    }

    registerNewUserDetails = async (email, password) => {                
        await this.emailField.waitFor()        
        await this.emailField.fill(email)
        await this.passwordField.waitFor()        
        await this.passwordField.fill(password)
        await this.registerBTN.waitFor()
        await this.registerBTN.click()
        await this.page.waitForURL("delivery-details", { timeout: 3000 })        
    }
}