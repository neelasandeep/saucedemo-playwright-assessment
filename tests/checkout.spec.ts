import { expect, test } from '@playwright/test';
import { addBackpackToCart, signIn } from './support/sauce-demo';

test.describe('Checkout', () => {
  test('CHK-01: checkout requires customer information', async ({ page }) => {
    await signIn(page);
    await addBackpackToCart(page);
    await page.getByRole('button', { name: 'Cart, 1' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Error: First Name is required',
    );
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
  });

  test('CHK-02: customer can complete a purchase', async ({ page }) => {
    await signIn(page);
    await addBackpackToCart(page);
    await page.getByRole('button', { name: 'Cart, 1' }).click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Jordan');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('QA');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('10001');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
  });
});