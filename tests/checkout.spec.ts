import {expect, test} from '@playwright/test';
import {addBackpackToCart, signIn} from './support/sauce-demo';
import {CheckoutPage} from './pages/checkout.page';
import {CartPage} from './pages/cart.page';

test.describe('Checkout', () => {
  test('CHECKOUT-01: requires customer information', async ({page}) => {
    await signIn(page);
   await addBackpackToCart(page);
   const cartPage = new CartPage(page);
   await cartPage.open();
   await cartPage.proceedToCheckout();
   await new CheckoutPage(page).submitEmptyInformation();
  });


  test('CHECKOUT-02: can complete a purchase', async ({page}) => {
    await signIn(page);
    const product = await addBackpackToCart(page);
    const cartPage = new CartPage(page);
    await cartPage.open();
    await cartPage.proceedToCheckout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.enterGeneratedCustomerInformation();
    await checkoutPage.expectOrderSummary(product);
    await checkoutPage.finishOrder();
  });
});
