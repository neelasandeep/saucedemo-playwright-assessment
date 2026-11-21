# Live Coding Video Guide

The assessment requires a live coding recording. The repository contains the finished automation, but the recording still needs to show you implementing the two selected cases. Use a temporary working copy or branch for the recording so the submitted main branch remains in its verified state.

## Before Recording

- Confirm the test plan and cases are committed before recording.
- Open `docs/test-plan.md`, `docs/test-cases.md`, and `tests/checkout.spec.ts` in the editor.
- Confirm SauceDemo is reachable and `npm test -- tests/checkout.spec.ts` passes.
- Start the screen recorder, check microphone and screen capture, and close unrelated windows or private information.
- Keep the recording link viewable without sign-in or permission requests.

## Suggested 8-12 Minute Walkthrough

1. **Context (about 1 minute):** Introduce SauceDemo, the Playwright/TypeScript choice, and why purchase completion and required-field validation are P1.
2. **Design (about 1 minute):** Show the written CHK-01 and CHK-02 preconditions, steps, and expected results before touching the code.
3. **CHK-01 (about 2-3 minutes):** In the temporary copy, implement the setup, submit the checkout information form empty, and assert that the first-name validation appears and checkout stays on the information step.
4. **CHK-02 (about 3-4 minutes):** Implement the successful flow: add the named item, enter synthetic customer information, review the order, finish, and assert the confirmation.
5. **Execution (about 1-2 minutes):** Run `npm test -- tests/checkout.spec.ts`, explain the two outcomes, and show that the result matches the written cases.
6. **Close (about 1 minute):** Point out trace/screenshot/video-on-failure configuration, the remaining coverage, and the public repository structure.

## Recording Checklist

- The video shows actual implementation and test execution, not only a narrated tour of finished code.
- The implementation matches the pre-written test cases; explain any intentional difference.
- The test run finishes visibly with both checkout cases passing.
- The video audio is clear and the text is readable at normal playback size.
- Verify the uploaded video URL in a signed-out/private browser window before submission.

The current verified implementation is in `tests/checkout.spec.ts`. Do not replace the submitted implementation with the temporary recording copy until its tests pass.