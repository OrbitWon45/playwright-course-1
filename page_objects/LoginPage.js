import { expect } from "@playwright/test"

export class LoginPage {
    constructor(page) {
        this.page = page

        this.registerBTN = page.locator('[data-qa="go-to-signup-button"]')
    }

    gotoSignupPage = async () => {
        await this.registerBTN.waitFor()
        await this.registerBTN.click()
        await this.page.waitForURL(/\/signup/, { timeout: 3000 })
    }
}