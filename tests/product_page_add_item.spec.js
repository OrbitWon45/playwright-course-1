import { expect, test} from "@playwright/test"

test.skip ("Verify Product Page Add to Basket", async ({ page }) => {

    const astronautDabbingBTN = page.locator('button[data-qa="product-button"]').first()
    const basketCounter = page.locator('div[data-qa="header-basket-count"]')
    const checkOut = page.getByRole('link', { name: 'Checkout' })

    await page.goto('/')     
    await astronautDabbingBTN.waitFor() 
    await expect(astronautDabbingBTN).toHaveText('Add to Basket') 
    await expect(basketCounter).toHaveText(/0/)   
    await astronautDabbingBTN.click()     
    await expect(astronautDabbingBTN).toHaveText('Remove from Basket')
    await expect(basketCounter).toHaveText(/1/) 

    await checkOut.waitFor()
    await checkOut.click()    
    await page.waitForURL("/basket")   
})