import { test, expect } from '@playwright/test';

// Test 1: Home page loads
test('Home page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/');   // or your Vercel URL

  // Target the unique heading instead of generic text
  await expect(
    page.getByRole('heading', { name: 'TailorMake' })
  ).toBeVisible();
});

// Test 2: Unauthenticated User cannot go to any page besides login/landing
test('Unauthenticated User gets redirected from home to landing', async ({ page }) => {
  await page.goto('http://localhost:5173/home');

  // After redirect, user should be on / and see TailorMake heading
  await expect(page).toHaveURL('http://localhost:5173/');
  await expect(page.getByRole('heading', { name: 'TailorMake' })).toBeVisible();
});

test('Unauthenticated User gets redirected from analyze to landing', async ({ page }) => {
  await page.goto('http://localhost:5173/analyze');

  // After redirect, user should be on / and see TailorMake heading
  await expect(page).toHaveURL('http://localhost:5173/');
  await expect(page.getByRole('heading', { name: 'TailorMake' })).toBeVisible();
});

test('Unauthenticated User gets redirected from tailor to landing', async ({ page }) => {
  await page.goto('http://localhost:5173/tailor');

  // After redirect, user should be on / and see TailorMake heading
  await expect(page).toHaveURL('http://localhost:5173/');
  await expect(page.getByRole('heading', { name: 'TailorMake' })).toBeVisible();
});