export class MyAccountPage {
    constructor(page) {
        this.page = page

        this.myAccountPageHeading = page.getByRole('heading', { name: 'My Account' })
        this.errorMessage = page.locator('[data-qa="error-message"]')
    }

    visit = async () => {        
        await this.page.goto("/my-account")        
    }

    waitForMyAccountPageHeading = async () =>{
        await this.myAccountPageHeading.waitFor()
    }

    waitForErrorMessage = async () => {
        await this.errorMessage.waitFor()
    }
}