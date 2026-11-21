import {  expect, Page, test} from '@playwright/test';
import type { ProductSnapshot } from '../support/sauce-demo';

export class CartPage {
    constructor(private readonly page: Page) {
        
    }

    async open(): Promise<void> {
    await this.page.getByRole('button', { name: /^Cart/ }).click();
    await expect(this.page).toHaveURL(/cart\.html$/);
  }
  async expectSelectedProductPrice(product: ProductSnapshot): Promise<void> {
    const cartItem = this.page.locator('.cart_item');
    await expect(cartItem).toHaveCount(1);
    await expect(cartItem.locator('.cart_quantity')).toHaveText('1');
    await expect(cartItem.locator('.inventory_item_price')).toHaveText(product.price);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html$/);
  }

    }