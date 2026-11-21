# SauceDemo Playwright Assessment

Senior QA Engineer assessment project: browser automation for the SauceDemo shopping journey using Playwright Test and TypeScript.

## Prerequisites

- Node.js 20 or newer
- npm
- Network access to [SauceDemo](https://www.saucedemo.com/)

## Setup

```bash
npm ci
npx playwright install chromium
```

## Run Tests

```bash
npm test
npm run typecheck
```

Run only the checkout cases:

```bash
npm test -- tests/checkout.spec.ts
```

Run the checkout cases in a visible browser:

```bash
npm run test:headed -- tests/checkout.spec.ts --workers=1
```

For a recording, add a delay between browser actions. This also raises the per-test timeout to two minutes while `PW_SLOW_MO` is set:

```bash
PW_SLOW_MO=700 npm test -- tests/checkout.spec.ts --headed --workers=1
```

Use the Playwright interactive runner with:

```bash
npm run test:ui
```

To target a different compatible environment, set `BASE_URL` before the test command. For example:

```bash
BASE_URL=https://www.saucedemo.com npm test
```

## Reports and Failure Artifacts

The HTML report is generated in `playwright-report/`. Open it with:

```bash
npm run test:report
```

Traces, screenshots, and videos are retained for failed tests under `test-results/`.

## Coverage

The seven cases cover valid and rejected sign-in, ascending-price sorting, add/remove cart behavior, required checkout information, and successful order completion. The live-coding cases are CHK-01 and CHK-02; their expected behavior is documented in [the test cases](docs/test-cases.md), with strategy and rationale in [the test plan](docs/test-plan.md).

## Test Accounts and Data

The suite uses SauceDemo's public demo credentials (`standard_user` / `secret_sauce` and `locked_out_user` / `secret_sauce`) and Faker-generated synthetic checkout values. These are demo credentials, not application secrets. No real payment or personal data is entered.

## CI

GitHub Actions runs type checking and the Chromium suite on pushes and pull requests. The report is uploaded as a workflow artifact. Because SauceDemo is an external public service, CI results depend on its availability.

## Assessment Submission Checklist

- Keep the written plan and cases in the public repository.
- Record the live coding session implementing CHK-01 and CHK-02 as documented.
- Run both cases successfully during the recording and explain the assertions.
- Upload the video to an accessible platform and verify it opens without special permissions.
- Add the public repository URL and video URL to the assessment submission form.