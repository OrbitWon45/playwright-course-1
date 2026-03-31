import { ProductPage } from "../page_objects/ProductPage.js"
import { NavigationHeader } from "../page_objects/NavigationHeader.js"
import { BasketPage } from "../page_objects/BasketPage.js"
import { LoginPage } from "../page_objects/LoginPage.js"
import { SignupPage } from "../page_objects/SignupPage.js"
import { DeliveryDetailsPage } from "../page_objects/DeliveryDetailsPage.js"
import { PaymentPage } from "../page_objects/PaymentPage.js"
import { MyAccountPage } from "../page_objects/MyAccountPage.js"

export class PomManager {
    constructor(page) {
        this.page = page
        this.productPage = new ProductPage(page)
        this.navigationHeader = new NavigationHeader(page)
        this.basketPage = new BasketPage(page)
        this.loginPage = new LoginPage(page)
        this.signupPage = new SignupPage(page)
        this.deliveryDetailsPage = new DeliveryDetailsPage(page)
        this.paymentPage = new PaymentPage(page)
        this.myAccountPage = new MyAccountPage(page)
    }
}