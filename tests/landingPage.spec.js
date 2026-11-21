import { test, expect } from '@playwright/test'; 

test('landingPage', async({page})=>{
    await page.goto("https://swimtrackpro.onrender.com/");
});