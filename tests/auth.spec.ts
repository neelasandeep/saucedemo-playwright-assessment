import { expect, test } from '@playwright/test';
import {
  LOCKED_OUT_USER,
  SAUCE_DEMO_PASSWORD,
  STANDARD_USER,
  signIn,
} from './support/sauce-demo';

test.describe('Authentication', () => {
  test('AUTH-01: standard user can sign in', async ({ page }) => {
    await signIn(page);

    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('AUTH-02: locked-out user is shown an access error', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Username' }).fill(LOCKED_OUT_USER);
    await page.getByRole('textbox', { name: 'Password' }).fill(SAUCE_DEMO_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products', { exact: true })).toHaveCount(0);
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
    await expect(page).toHaveURL(/\/$/);
  });

  test('AUTH-03: invalid password is rejected', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Username' }).fill(STANDARD_USER);
    await page.getByRole('textbox', { name: 'Password' }).fill('incorrect-password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
    await expect(page).toHaveURL(/\/$/);
  });
});