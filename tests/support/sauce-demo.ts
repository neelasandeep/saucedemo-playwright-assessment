import { expect, type Page } from '@playwright/test';

export const SAUCE_DEMO_PASSWORD = 'secret_sauce';
export const STANDARD_USER = 'standard_user';
export const LOCKED_OUT_USER = 'locked_out_user';

export interface ProductSnapshot {
  name: string;
  price: string;
}

export async function signIn(page: Page, username = STANDARD_USER): Promise<void> {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(SAUCE_DEMO_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
}

export async function addBackpackToCart(page: Page): Promise<ProductSnapshot> {
  const backpack = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });
  const product = {
    name: (await backpack.locator('.inventory_item_name').innerText()).trim(),
    price: (await backpack.locator('.inventory_item_price').innerText()).trim(),
  };
  await backpack.getByRole('button', { name: 'Add to cart' }).click();
  return product;
}