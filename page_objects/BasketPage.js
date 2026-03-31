import { expect } from "@playwright/test"

export class BasketPage {
    constructor(page) {
        this.page = page

        this.productPrice = page.locator('[data-qa="basket-item-price"]')
        this.removeItemBTN = page.locator('[data-qa="basket-card-remove-item"]')
        this.productCard = page.locator('[data-qa="basket-card"]')
        this.continueToCheckoutBTN = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async () => {
        await this.productCard.first().waitFor()
        const productCountBeforeRemoval = await this.productCard.count()        
        await this.productPrice.first().waitFor()
        const productPricesText = await this.productPrice.allInnerTexts()        
        const numProductPrices = productPricesText.map( (element) => {
            const justNumbers = element.replace("$", "")
            return parseInt(justNumbers, 10)
        })        
        const smallestPrice = Math.min(...numProductPrices)
        const smallestPriceIdex = numProductPrices.indexOf(smallestPrice) 
        const specificRemoveBtn = this.removeItemBTN.nth(smallestPriceIdex)             
        await specificRemoveBtn.waitFor()
        await specificRemoveBtn.click()                               
        await expect(this.productCard).toHaveCount(productCountBeforeRemoval -1)         
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutBTN.waitFor()
        await this.continueToCheckoutBTN.click()
        await this.page.waitForURL(/\/login/, { timeout: 3000 })

    }
}