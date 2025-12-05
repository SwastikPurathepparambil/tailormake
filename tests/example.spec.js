import { test, expect } from '@playwright/test';

// Test 1: Home page loads
test('home page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/');   // or your Vercel URL

  // Change this text to something you KNOW appears on your home page
  await expect(page.getByText("/tailormake/i")).toBeVisible();
});
