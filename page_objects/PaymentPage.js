import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountCodeField = page.getByRole('textbox', { name: 'Discount code' })
        this.discountBTN = page.locator('button[data-qa="submit-discount-button"]')
        this.total = page.locator('[data-qa="total-value"]')
        this.totalDiscountValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActivatedMSG = page.locator('[data-qa="discount-active-message"]')
        this.creditCardOwnerField = page.getByRole('textbox', { name: 'Credit card owner' })
        this.creditCardNumField = page.locator('[data-qa="credit-card-number"]')
        this.creditCardExpirationDateField = page.getByRole('textbox', { name: 'Valid until' })
        this.creditCardCvcField = page.locator('input[data-qa="credit-card-cvc"]')
        this.payBTN = page.locator('button[data-qa="pay-button"]')
        this.thankYouMSG = page.getByRole('heading', { name: 'Thank you for shopping with' })
    } 

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText() 
        await this.discountCodeField.waitFor()

        // option 1 for laggy input field using fill() with await expect()
        // await this.discountCodeField.fill(code)
        // await expect(this.discountCodeField).toHaveValue(code)

        // option 2 for laggy inputs: slow typing        
        // await this.discountCodeField.focus()
        // await this.page.keyboard.type(code, {delay: 1000}) 
        // expect(await this.discountCodeField.inputValue()).toBe(code)

        await this.discountCodeField.focus()
        await this.page.keyboard.type(code, {delay: 1000})
        expect(await this.discountCodeField.inputValue()).toBe(code)
        await expect(this.discountActivatedMSG).toBeHidden()
        expect(await this.totalDiscountValue.isVisible()).toBeFalsy()
        await this.discountBTN.waitFor()
        await this.discountBTN.click()
        await this.discountActivatedMSG.waitFor()
        await expect(this.discountActivatedMSG).toBeVisible() 
        await this.total.waitFor()
        const totalValueText = await this.total.innerText() 
        const totalValue = await totalValueText.replace('$', '') 
        const totalValueInt = parseInt(totalValue, 10)      
        await this.totalDiscountValue.waitFor()
        const totalDiscountPriceText = await this.totalDiscountValue.innerText()
        const totalDiscountPrice = await totalDiscountPriceText.replace('$', '')
        const totalDiscountPriceInt = parseInt(totalDiscountPrice, 10)        
        expect(totalDiscountPriceInt).toBeLessThanOrEqual(totalValueInt)        
    }

    fillCreditCardDetails = async (ccd) => {
        await this.creditCardOwnerField.waitFor()
        await this.creditCardOwnerField.fill(ccd.creditCardOwner)
        await this.creditCardNumField.waitFor()
        await this.creditCardNumField.fill(ccd.creditCardNum)
        await this.creditCardExpirationDateField.waitFor()
        await this.creditCardExpirationDateField.fill(ccd.creditCardExpirationDate)
        await this.creditCardCvcField.waitFor()
        await this.creditCardCvcField.fill(ccd.creditCardCVC)                
    }

    clickPayButton = async () => {
        await this.payBTN.waitFor()
        await this.payBTN.click()
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 })
        await expect(this.thankYouMSG).toBeVisible()        
    }
}