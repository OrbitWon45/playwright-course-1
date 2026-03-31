import { test } from "@playwright/test"
import { PomManager } from "../page_objects/PomManager.js" 
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { adminDetails } from "../data/userDetails.js"

// jenkins, CircleCI, TravisCI, GitHub Actions

test ("My account using cookie injections and mocking network request", async ({ page }) => {
    const pm = new PomManager(page)

    // Make a request to get login token
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password) 
    // Mock a network request
    await page.route("**/api/user**", async (route) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"})
        })
    }) 
       
    await pm.myAccountPage.visit()       
    // inject login token into browser     
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = `token= ${loginTokenInsideBrowserCode}`        
    }, [loginToken]) 
    await pm.myAccountPage.visit()  
    await pm.myAccountPage.waitForMyAccountPageHeading()
    await pm.myAccountPage.waitForErrorMessage()           
})