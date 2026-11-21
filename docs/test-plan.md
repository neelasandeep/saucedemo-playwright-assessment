# SauceDemo UI Automation Test Plan

## Objective

Assess the core customer shopping journey on SauceDemo using browser-based UI automation. The suite verifies authentication, product sorting, cart changes, checkout validation, and successful order completion.

## Application and Tooling

- Application: [SauceDemo](https://www.saucedemo.com/), a public e-commerce demo.
- Automation: Playwright Test with TypeScript.
- Browser: Chromium (Desktop Chrome profile).
- Test data: public demo accounts and synthetic checkout information only.
- Target URL can be overridden with the `BASE_URL` environment variable.

## Scope

### In scope

- Successful sign-in for the standard demo user.
- Rejection of a locked-out account and invalid password.
- Inventory sorting by ascending price.
- Adding and removing an item from the cart.
- Required-field validation during checkout.
- Completing an order and confirming the resulting success state.

### Out of scope

- Payment processing, shipping integrations, and real customer data.
- Backend/API contracts, database state, and production performance.
- Exhaustive browser/device coverage beyond Chromium.
- Visual regression comparison and accessibility certification.

## Test Design and Strategy

Tests are organized by authentication, inventory/cart, and checkout. Each test starts from an isolated browser context and establishes its own UI state. Shared helpers capture product data during setup, while focused cart and checkout page objects encapsulate interactions and repeated assertions. Test names and page-object method calls keep each scenario readable as a business flow.

Playwright role/name locators are preferred because they reflect user-facing controls and improve resilience to layout changes. SauceDemo does not expose a test ID for every control, so the inventory card is scoped by its product link and the site's `data-test` attributes are used for validation messages. Assertions check observable user outcomes rather than implementation details.

The suite relies on Playwright's auto-waiting and web-first assertions; it does not use arbitrary sleeps. Chromium is the initial target to keep execution quick and the assessment focused. In CI, a single retry is allowed to collect useful diagnostics for transient external-site failures, but a retry is not considered proof of stability.

## Prioritization and Rationale

P1 covers access, cart state, checkout validation, and purchase completion because these behaviors can block or directly affect the primary shopping journey. P2 covers price sorting, a useful catalog feature but a lower business risk than completing checkout. The recording focuses on CHK-01 and CHK-02 to demonstrate both a negative validation path and the end-to-end success path.

## Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Public demo is unavailable or changes | Keep `BASE_URL` configurable, capture traces/screenshots on failure, and distinguish environment failures from product defects. |
| Shared demo service is transient or slow | Use Playwright auto-waiting, avoid fixed sleeps, and keep CI retries limited to one. |
| UI text or structure changes | Prefer role/name locators and scope repeated product actions to the named product card. |
| Tests depend on prior state | Use an independent test context and sign in within each test. |
| Demo credentials are not production credentials | Use only the published demo accounts and synthetic checkout data; do not store secrets. |

## Entry and Exit Criteria

**Entry:** Node.js 20 or newer, dependencies installed, Chromium installed, and SauceDemo reachable.

**Exit:** All seven documented cases pass against the demo site; type checking passes; the HTML report and failure artifacts are generated as configured. Any external-site outage or behavior change is recorded separately rather than hidden by repeated retries.

## Execution

See the root [README](../README.md) for setup, execution, and report commands.