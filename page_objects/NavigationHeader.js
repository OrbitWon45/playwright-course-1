import { isDesktopViewport } from "../utils/isDesktopViewport.js"

export class NavigationHeader {
    constructor(page) {
        this.page = page

        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
        this.mobileBugerBTN = page.locator('[data-qa="burger-button"]')
    } 

    gotoBasketPage = async () => {
        if (!isDesktopViewport(this.page)) {
            await this.mobileBugerBTN.waitFor()
            await this.mobileBugerBTN.click()
        }
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL('/basket', { timeout: 3000})
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        // return number
        const text = await this.basketCounter.innerText()
        // '0' => 0
        const asNumber = parseInt(text, 10)
        return asNumber        
    }
}