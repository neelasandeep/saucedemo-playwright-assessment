import { expect, type Page } from '@playwright/test';
import { moneyToCents } from '../support/checkout-assertions';
import type { ProductSnapshot } from '../support/sauce-demo';


export class CheckoutPage {
     constructor(private readonly page: Page) {}
     async submitEmptyInformation(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.locator('[data-test="error"]')).toHaveText(
      'Error: First Name is required',
    );
    await expect(this.page).toHaveURL(/checkout-step-one\.html$/);
  }

  async enterGeneratedCustomerInformation(): Promise<void> {
    const { faker } = await import('@faker-js/faker');
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(faker.person.firstName());
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(faker.person.lastName());
    await this.page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(faker.location.zipCode('#####'));
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page).toHaveURL(/checkout-step-two\.html$/);
  }

  async expectOrderSummary(product: ProductSnapshot): Promise<void> {
    await expect(this.page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
    const overviewItem = this.page.locator('.cart_item');
    await expect(overviewItem.locator('.inventory_item_name')).toHaveText(product.name);
    await expect(overviewItem.locator('.inventory_item_price')).toHaveText(product.price);

    const subtotal = moneyToCents(await this.page.locator('.summary_subtotal_label').innerText());
    const tax = moneyToCents(await this.page.locator('.summary_tax_label').innerText());
    const total = moneyToCents(await this.page.locator('.summary_info').getByText(/^Total:/).innerText());

    expect(subtotal).toBe(moneyToCents(product.price));
    expect(total).toBe(subtotal + tax);
    await expect(this.page.locator('.summary_value_label').last()).toContainText(/free/i);
  }

  async finishOrder(): Promise<void> {
    await this.page.getByRole('button', { name: 'Finish' }).click();
    await expect(this.page).toHaveURL(/checkout-complete\.html$/);
    await expect(this.page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
  }

}