import { test } from "@playwright/test"
import { v4 as uuidv4 } from "uuid"
import  { PomManager }  from "../page_objects/PomManager.js"
import { deliveryDetails as userDetails } from "../data/deliveryDetails.js"
import { creditCardDetails as ccd } from "../data/creditCardDetails.js"

test ("New User end to end test journey", async ({ page }) => {
    const pm = new PomManager(page)
    
    await pm.productPage.visit()
    await pm.productPage.sortByCheapest()    
    await pm.productPage.addProductToBasket(0)
    await pm.productPage.addProductToBasket(1)
    await pm.productPage.addProductToBasket(2)
    
    await pm.navigationHeader.gotoBasketPage()

    await pm.basketPage.removeCheapestProduct()
    await pm.basketPage.continueToCheckout()   
    
    await pm.loginPage.gotoSignupPage()

    const email = `${uuidv4()}@test.com`
    const password = uuidv4()
    await pm.signupPage.registerNewUserDetails(email, password)
    
    await pm.deliveryDetailsPage.fillOutDeliveryDetails(userDetails)
    await pm.deliveryDetailsPage.saveDetails()
    await pm.deliveryDetailsPage.continueToPayment()
        
    await pm.paymentPage.activateDiscount()
    await pm.paymentPage.fillCreditCardDetails(ccd)
    await pm.paymentPage.clickPayButton()
})