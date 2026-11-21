import{test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto("https://swimtrackpro.onrender.com/");
    await page.getByRole('button', { name: 'Login / Register' }).click();
});

test('optionLogin', async({page})=>{
    await page.locator("#guestBtn").click();
    await page.locator("#trainerBtn").click();
    await page.locator("div.logo-icon").dblclick();
});

test('swimmerlogin', async({page})=>{
    await page.locator("#guestBtn").click();
    await page.locator('#nameInput').fill('testUser1');
    await page.locator('#phoneInput').fill('9133851444');
    await page.locator('#rememberMe').check();
    await page.locator('#submitBtn').click();
    const brandName = await page.locator('.brand-title').textContent();
    console.log(brandName);
    if (brandName.includes('SwimTrackPro')) {
        console.log("You are landed on Dashboard page of SwimTrackPro");
    }
});

test('coachlogin', async({page})=>{
    await page.locator("#trainerBtn").click();
    await page.locator('#nameInput').fill('M1400');
    await page.locator('#passwordInput').fill('muni@1');
    await page.locator('#togglePasswordIcon').click();
    await page.locator('#rememberMe').check();
    await page.locator('#submitBtn').click();
    const brandName = await page.locator('.brand-title').textContent();
    console.log(brandName);
    if (brandName.includes('SwimTrackPro')) {
        console.log("You are landed on Dashboard page of SwimTrackPro");
    }
});

test('adminLogin', async({page})=>{
    await page.locator("div.logo-icon").dblclick();
    await page.locator('#nameInput').fill('M1400');
    // await Promise.all([page.waitForURL(/\/payment_options\//),])
    await page.getByPlaceholder('Enter password').fill('91338')
    await page.locator('#togglePasswordIcon').click();
    await page.locator('#rememberMe').check();
    const cnfmAdmnTxt = page.locator('#submitBtn');
    if(await cnfmAdmnTxt.isVisible()){
        await expect(cnfmAdmnTxt).toHaveText("Login as Admin");
        console.log("It's a Admin Login Button");
    }
    await cnfmAdmnTxt.click();
});