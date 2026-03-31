import { expect } from "@playwright/test"
import { PomManager } from "../page_objects/PomManager.js" 
import { isDesktopViewport} from "../utils/isDesktopViewport.js"

export class ProductPage {
    constructor(page) {
        this.page = page           

        this.productBasketBTN = page.locator('[data-qa="product-button"]')
        this.sortDropDown = page.locator('[data-qa="sort-dropdown"]')
        this.productPrice = page.locator('[datatype="product-price"]')        
    }

    visit = async () => {
        await this.page.goto('/')
    }

    sortByCheapest = async () => {
        await this.sortDropDown.waitFor()
        // Get the order of products
        await this.productPrice.first().waitFor()
        const productPricesBefore = await this.productPrice.allInnerTexts()                
        const productPricesBeforeSorted = await productPricesBefore.sort()             
        await this.sortDropDown.selectOption("price-asc")
        // Get the order of products again
        const productPricesAfter = await this.productPrice.allInnerTexts()        
        // Assert that they are (.not) diffrent
        expect(productPricesAfter).toEqual(productPricesBeforeSorted)        
    }
    
    addProductToBasket = async (index) => {        
        const specificProductBasketBTN = this.productBasketBTN.nth(index)
        await specificProductBasketBTN.waitFor()
        await expect(specificProductBasketBTN).toHaveText('Add to Basket')
        const pm = new PomManager(this.page)
        let basketCountBeforeAdding
        if (isDesktopViewport(this.page)) {
            basketCountBeforeAdding = await pm.navigationHeader.getBasketCount()
        }                
        await specificProductBasketBTN.click()
        await expect(specificProductBasketBTN).toHaveText('Remove from Basket')
        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await pm.navigationHeader.getBasketCount()
            expect(basketCountBeforeAdding).toBeLessThan(basketCountAfterAdding) 
        }         
    }
}