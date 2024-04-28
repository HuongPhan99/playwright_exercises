import { Page, expect, test } from "@playwright/test";

let page: Page;
const userName = "helloA";
const passsword = "testing1";

test.describe("Login", () => {
  test.beforeAll(async ({ browser }) => {
   await test.step("Before all step", async () => {
    page = await browser.newPage();
    //Login
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.locator("button:has-text('Login')").click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    //Create user
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: 'Admin' }).click();
    await page.locator('form i').nth(1).click();
    await page.getByRole('option', { name: 'Enabled' }).click();
    const employee = await page.locator("[class ='oxd-userdropdown-name']").allTextContents();
    await page.getByPlaceholder('Type for hints...').type(employee.toString());
    await page.waitForTimeout(30000);
    await page.getByPlaceholder('Type for hints...').press('ArrowDown');
    await page.getByPlaceholder('Type for hints...').press('Enter');
    await page.getByRole('textbox').nth(2).fill(userName);
    await page.getByRole('textbox').nth(3).fill(passsword);
    await page.getByRole('textbox').nth(4).fill(passsword);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  });
});

test.afterAll(async () => {
  await test.step("After all step", async () => {
  });
});

test.beforeEach(async ({ page }) => {
  await test.step("Before each step: Go to OrangeHRM Login page", async () => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  });
});

test.afterEach(async () => {
  await test.step("After each step: Close the page", async () => {
    await page.close();
  });
});
test("Test 1 - Login successfully", async () => {
  await test.step("Step 1: Enter valid username and password", async () => {
    await expect(page.getByText('Login')).toBeVisible();
    await page.locator("input[name='username']").fill(userName);
    await page.locator("input[name='password']").fill(passsword);
    await page.locator("button:has-text('Login')").click();
  });

  await test.step("Step 2: Verify that user is logged in successfully", async () => {
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
  });
});

test("Test 2 - Login unsuccessfully", async () => {
  await test.step("Step 1: Login with invalid password and leave username", async () => {
    await expect(page.getByText('Login')).toBeVisible();
    let invalidPass = passsword + "2";
    await page.locator("input[name='password']").fill(invalidPass);
    await page.locator("button:has-text('Login')").click();
  });

  await test.step("Step 2: Verify alert message is shown up", async () => {
    await expect(page.locator(":text-is('Required')")).toBeVisible();
  });
});

});

