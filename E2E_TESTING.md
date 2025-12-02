# E2E Testing

This project uses Playwright for end-to-end testing.

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npx playwright test --headed
```

## Test Coverage

The E2E test suite covers:

- **Adding exits in primary direction** - Ensures values persist exactly as entered
- **Adding exits in reversed direction** - Verifies no unwanted value transformation
- **Editing existing exits** - Confirms edited values persist correctly
- **Deleting exits** - Validates removal functionality
- **Zero values** - Tests that car=0 and door=0 are supported

## Test Details

All tests are located in the `e2e/` directory:
- `exit-crud.spec.js` - Comprehensive CRUD operations for exits

## Important Notes

- Tests use Firebase, so they require an active internet connection
- The dev server must be running on port 5174 (handled automatically by Playwright config)
- Tests include reasonable wait times for Firebase to load data

## Debugging Failed Tests

If tests fail:
1. Run with `--headed` flag to see browser interactions
2. Check `playwright-report/` for detailed HTML report
3. View traces with `npx playwright show-trace trace.zip`
