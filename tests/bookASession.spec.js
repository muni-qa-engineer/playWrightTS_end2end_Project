import{test, expect} from '@playwright/test';

test('bookASession', async({page})=>{
    await page.goto("https://swimtrackpro.onrender.com/");
    await page.locator("//button[text()='Login / Register']").click();
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
    // Book A Session
    await page.locator('#desktopNavBookSession').click();
    await page.getByLabel('Select Coach *').click();
    // SelectOption with known index (index: 0)
    await page.selectOption('select#coachSelect', { index: 1 });
    // selectOption with know Value
    await page.selectOption('[name="package"]','Monthly');
    // Fill startDate
    const startDateLocator = page.locator('#startDateInput');
    await startDateLocator.fill('2026-12-30'); 
    console.log('startDate: ' + await startDateLocator.inputValue());
    const endDateLocator = page.locator('#endDateInput');
    await expect(endDateLocator).not.toHaveValue(''); 
    console.log('End date: ' + await endDateLocator.inputValue());

    await page.selectOption('[name="time"]','07:00 AM');
    // Target the visible labels instead of the hidden inputs
    await page.getByText('Mon', { exact: true }).click();
    await page.getByText('Wed', { exact: true }).click();
    await page.getByText('Fri', { exact: true }).click();
    await page.locator('#locateBtn').click();
    
    await page.locator('#locateBtn').click();
    await page.locator('#step1NextBtn').click();

    // 5. STEP 2: Swimmer Details
    await expect(page.locator('#step-pane-2')).toBeVisible();
    // Set skill level
    await page.locator('#skillLevelSelect').selectOption('Regular');
    // Submit booking form and wait for redirect to Step 3 (Payment Options)
    await Promise.all([
        page.waitForURL(/\/payment_options\//),
        page.locator('#confirmBookingBtn').click()
    ]);
    // 6. STEP 3: Payment & Confirmation
    await expect(page.locator('#sectionPayLater')).toBeVisible();
    // Confirm booking using 'Pay Later'
    await page.locator('#payLaterBtn').click();
    // Wait for the booking confirmation overlay
    await expect(page.locator('#paymentSuccessOverlay')).toBeVisible();
    // 7. Verify redirection to My Bookings page
    await page.waitForURL(/.*my-bookings.*/, { timeout: 15000 });
    await expect(page).toHaveURL(/.*my-bookings.*/);
    console.log("Booking successfully confirmed and visible in My Bookings!");

    // await page.getByRole('button', { name: 'Delete' }).click();
    // await page.locator('#confirmToastYesBtn').click();


    // await page.pause();

});