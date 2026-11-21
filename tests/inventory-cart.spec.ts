import { expect, test } from '@playwright/test';
import { addBackpackToCart, signIn } from './support/sauce-demo';

test.describe('Inventory and cart', () => {
  test('INV-01: products can be sorted by price from low to high', async ({ page }) => {
    await signIn(page);
    await page.getByRole('combobox', { name: 'Sort products' }).selectOption('lohi');

    const displayedPrices = await page.locator('.inventory_item_price').allTextContents();
    const prices = displayedPrices.map((price) => Number(price.replace('$', '')));

    expect(prices).toHaveLength(6);
    expect(prices).toEqual([...prices].sort((first, second) => first - second));
  });

  test('CART-01: an item can be added to and removed from the cart', async ({ page }) => {
    await signIn(page);
    await addBackpackToCart(page);

    await page.getByRole('button', { name: 'Cart, 1' }).click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toHaveCount(0);
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
});