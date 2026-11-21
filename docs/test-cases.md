# SauceDemo Test Cases

## Shared Preconditions and Data

- Open `https://www.saucedemo.com/` in a fresh browser context for each case.
- Standard account: `standard_user` / `secret_sauce`.
- Locked account: `locked_out_user` / `secret_sauce`.
- Checkout data: Jordan / QA / 10001 (synthetic data).
- The tests use no real customer or payment information.

## Cases

### AUTH-01: Standard user can sign in

- **Priority:** P1
- **Preconditions:** User is signed out.
- **Steps:** Enter the standard account credentials and select Login.
- **Expected:** The inventory page opens, the Products heading is visible, and six inventory cards are displayed.
- **Automation:** `tests/auth.spec.ts`

### AUTH-02: Locked-out user is rejected

- **Priority:** P1
- **Preconditions:** User is signed out.
- **Steps:** Enter `locked_out_user` and the demo password, then select Login.
- **Expected:** The inventory page does not open and the locked-out error is displayed.
- **Automation:** `tests/auth.spec.ts`

### AUTH-03: Invalid password is rejected

- **Priority:** P1
- **Preconditions:** User is signed out.
- **Steps:** Enter `standard_user` with an incorrect password, then select Login.
- **Expected:** The inventory page does not open and the invalid-credentials error is displayed.
- **Automation:** `tests/auth.spec.ts`

### INV-01: Sort inventory by ascending price

- **Priority:** P2
- **Preconditions:** Signed in as the standard user; inventory is visible.
- **Steps:** Select Price (low to high) from the inventory sort control.
- **Expected:** Six displayed product prices are in ascending numeric order.
- **Automation:** `tests/inventory-cart.spec.ts`

### CART-01: Add and remove an item

- **Priority:** P1
- **Preconditions:** Signed in as the standard user; inventory is visible.
- **Steps:** Add Sauce Labs Backpack, open the cart, then select Remove.
- **Expected:** Cart count becomes 1 after adding; the backpack appears in the cart; after removal, the cart has no items.
- **Automation:** `tests/inventory-cart.spec.ts`

### CHK-01: Checkout requires customer information

- **Priority:** P1
- **Preconditions:** Signed in as the standard user with Sauce Labs Backpack in the cart.
- **Steps:** Open the cart, select Checkout, leave all customer fields blank, and select Continue.
- **Expected:** Checkout remains on the information step and displays `Error: First Name is required`.
- **Automation:** `tests/checkout.spec.ts`
- **Live coding case:** Yes

### CHK-02: Complete a purchase

- **Priority:** P1
- **Preconditions:** Signed in as the standard user with Sauce Labs Backpack in the cart.
- **Steps:** Open the cart, select Checkout, enter valid first name, last name, and postal code, select Continue, review the order, then select Finish.
- **Expected:** The overview includes Sauce Labs Backpack, checkout completes, and the success page displays `Thank you for your order!`.
- **Automation:** `tests/checkout.spec.ts`
- **Live coding case:** Yes

## Traceability

| Requirement area | Case IDs | Priority |
|---|---|---|
| Authentication | AUTH-01, AUTH-02, AUTH-03 | P1 |
| Inventory | INV-01 | P2 |
| Cart | CART-01 | P1 |
| Checkout validation and completion | CHK-01, CHK-02 | P1 |