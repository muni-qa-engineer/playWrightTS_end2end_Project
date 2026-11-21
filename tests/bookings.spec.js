import {test, expect} from '@playwright/test';



test('findBookings', async({page}) => {
    const swimmerName = 'testUser1';
    const swimmerPhone = '9133851444';

    await page.goto("https://swimtrackpro.onrender.com/");
    await page.locator("//button[text()='Login / Register']").click();
    await page.locator("#guestBtn").click();
    await page.locator('#nameInput').fill(swimmerName);
    await page.locator('#phoneInput').fill(swimmerPhone);
    await page.locator('#rememberMe').check();
    await page.locator('#submitBtn').click();
    const pageName = await page.locator('#desktopNavBookings').textContent();
    console.log("Sekhar is printing: " + pageName);
    if (pageName.includes('Bookings')) {
        console.log("You are landed on Dashboard page of SwimTrackPro");
    }
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