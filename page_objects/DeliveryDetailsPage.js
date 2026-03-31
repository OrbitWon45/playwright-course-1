import { expect } from "@playwright/test"

export class DeliveryDetailsPage {
    constructor(page) {
        this.page = page

        this.firstNameField = page.locator('input[data-qa="delivery-first-name"]')
        this.lastNameField = page.locator('input[placeholder="Last name"]')
        this.streetField = page.locator('input[placeholder="Street"]')
        this.postCodeField = page.locator('input[placeholder="Post code"]')
        this.cityField = page.getByRole('textbox', { name: 'City' })
        this.countryDropdown = page.locator('select[data-qa="country-dropdown"]')
        this.saveAddressBTN = page.locator('button[data-qa="save-address-button"]')
        this.continueToPaymentBTN = page.getByRole('button', { name: 'Continue to payment' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
    }

    fillOutDeliveryDetails = async (deliveryDetails) => {               
        await this.firstNameField.waitFor()
        await this.firstNameField.fill(deliveryDetails.firstName)
        await this.lastNameField.waitFor()
        await this.lastNameField.fill(deliveryDetails.lastName)
        await this.streetField.waitFor()
        await this.streetField.fill(deliveryDetails.street)
        await this.postCodeField.waitFor()
        await this.postCodeField.fill(deliveryDetails.postcode)
        await this.cityField.waitFor()
        await this.cityField.fill(deliveryDetails.city)
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(deliveryDetails.country)                
    }

    saveDetails = async () => {        
        const savedAddressContainerCountBefore = await this.savedAddressContainer.count()
        await this.saveAddressBTN.waitFor()
        await this.saveAddressBTN.click()                      
        await expect(this.savedAddressContainer).toHaveCount(savedAddressContainerCountBefore + 1)
        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameField.inputValue())
        await this.savedAddressLastName.first().waitFor()
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameField.inputValue())
        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetField.inputValue())
        await this.savedAddressPostcode.first().waitFor()
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postCodeField.inputValue())
        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityField.inputValue())
        await this.savedAddressCountry.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())        
    }

    continueToPayment = async () => {        
        await this.continueToPaymentBTN.waitFor()
        await this.continueToPaymentBTN.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000 })
    }
}