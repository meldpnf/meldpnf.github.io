import { test, expect } from '@playwright/test';

test('VISUALS link opens the Visuals page', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByRole('link', { name: 'VISUALS' }).click();

  await expect(page).toHaveURL(/\/visuals\/?$/);

  await expect(
    page.getByRole('heading', { name: 'VISUALS' })
  ).toBeVisible();
});