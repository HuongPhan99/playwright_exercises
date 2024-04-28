import { expect, test } from "@playwright/test";
test("Test - Buy a Iphone 13 Pro", async ({ page }) => {
    const productName = "IPHONE 13 PRO";
    
    await test.step("Step 1: Login", async () => {
      await page.goto("https://rahulshettyacademy.com/client");
      await page.getByPlaceholder('email@example.com').fill("rahulshetty@gmail.com");
      await page.getByPlaceholder('enter your passsword').fill("Iamking@000")
      await page.getByRole('button', { name:'login'}).click();
    });

    await test.step("Step 2: Add a IPhone 13 Pro", async() => {
      //Click button Add To Cart of Iphone 13 Pro
      await page.locator('.card-body').filter({hasText:productName}).getByRole('button', {name:' Add To Cart'}).click();
    })

    await test.step("Step 3: Go To Cart page",async() => {
      await page.locator("//button[@routerlink='/dashboard/cart']").click();
      await expect(page.locator('.cart')).toContainText(productName);
    })

    await test.step("Step 4: Place order",async() => {

      //click button "Check out"
      await page.getByRole('button', { name:'Checkout'}).click();

      //Typing country to Seclect Country
      await page.getByPlaceholder('Select Country').type('Can');
      await page.waitForSelector("//button[@class='ta-item list-group-item ng-star-inserted']");
      const listCountrys = await page.$$("//button[@class='ta-item list-group-item ng-star-inserted']");
      //Loop to find correct country
      for (let i = 0; i < listCountrys.length; i++) {
        const country = await listCountrys[i].textContent();

        if (country?.toString().trim().toUpperCase() === 'CANADA') {
            await listCountrys[i].click();
            break;
        }
      }

      //Click button "Place Order"
      await page.locator("[class='btnn action__submit ng-star-inserted']").click();
      
    })

    await test.step("Step 5: Verify Order ID",async() => {
      await expect(page.getByText('THANKYOU FOR THE ORDER')).toBeVisible();
      const listIDs = await page.locator("[class ='ng-star-inserted']").allTextContents();
      //Get Order Id
      let orderID = listIDs[0].split('|')[1];

      //Load Orders History Page
      await page.locator("//button[@routerlink='/dashboard/myorders']").click();
      //Verify Order ID
      await expect(page.getByText(orderID)).toBeVisible();
    })

  });
