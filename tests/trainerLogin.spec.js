import {test, expect} from '@playwright/test';

// Use before each test case.
test.beforeEach(async ({ page }) => {
  // Increase timeout for potential cold starts on free hosting
  await page.goto("https://swimtrackpro.onrender.com/", { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.getByRole('button', { name: 'Login / Register' }).click();
  await page.locator("#trainerBtn").click();
  await page.locator('#nameInput').fill('M1400');
  await page.locator('#passwordInput').fill('muni@1');
  await page.locator('#rememberMe').check();
  await page.locator('#submitBtn').click();
  
  // Verify login success before proceeding
  await expect(page.locator('.brand-title')).toContainText('SwimTrackPro');
});

test('checkBookings', async ({page}) => {
    const brandName = await page.locator('.brand-title').textContent();
    console.log(brandName);
    if (brandName.includes('SwimTrackPro')) {
        console.log("You are landed on Dashboard page of SwimTrackPro");
    }
    // await page.locator("a[href*='/my-bookings']").click();
    await page.locator('#desktopNavBookings').click();
    const noBookingText = page.getByText("No bookings found. Start by booking a slot!");
    if(await noBookingText.isVisible()){
        await expect(noBookingText).toHaveText("No bookings found. Start by booking a slot!");
        console.log("No Bookings Found");
    }
    else{
        // 1. Create the locator for all matching elements
        const pillLocator = page.locator(".d-none.d-sm-inline");
        // 2. Count how many elements match the selector
        const pillCount = await pillLocator.count();
        const statusCount = page.locator('span.badge.filter-badge.ms-1.ms-sm-2.rounded-pill');
        for (let i = 0; i < pillCount; i++) {
            const text = await pillLocator.nth(i).textContent();
            const textCount = await statusCount.nth(i).textContent();
            console.log(`Status of ${text}` +':' +`${textCount}`);
        }

    }
});

test('checkPayments', async({page}) => {
    await page.locator('#desktopNavPayments').click();
    const coachRecievedAmt = await page.locator('#paidAmountCard').textContent();
    const PendAmt = await page.locator('#pendingAmountCard').textContent();
    const NotPaidAmt = await page.locator('#notPaidAmountCard').textContent();
    console.log(`Coach Recieved Amount is = ${coachRecievedAmt}`)
    console.log(`Pending Amount is = ${PendAmt}`)
    console.log(`Not Paid Amount is = ${NotPaidAmt}`)

});