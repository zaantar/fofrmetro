import { test, expect } from '@playwright/test';

test.describe('Exit CRUD Operations', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Wait for Firebase to load
        await page.waitForTimeout(3000);
    });

    test('should add exit in primary direction and persist values correctly', async ({ page }) => {
        // Navigate to Linka A -> To Depo Hostivař -> Nemocnice Motol
        await page.click('text=Linka A');
        await page.click('text=To Depo Hostivař');
        await page.click('text=Nemocnice Motol');

        // Click Add New
        await page.click('text=+ Add New');

        // Fill in exit details
        await page.fill('input[placeholder*="Wenceslas"]', 'Primary Direction Test');
        await page.fill('input[type="number"]', '2'); // Car
        await page.locator('input[type="number"]').nth(1).fill('3'); // Door

        // Save
        await page.click('text=Save Exit');
        await page.waitForTimeout(2000);

        // Verify exit appears in list with correct values
        await expect(page.locator('text=Primary Direction Test')).toBeVisible();
        const exitCard = page.locator('.exit-card', { hasText: 'Primary Direction Test' });
        await expect(exitCard.locator('.position-box').first()).toContainText('2');
        await expect(exitCard.locator('.position-box').last()).toContainText('3');

        // Click to edit and verify values match
        await exitCard.click();
        await expect(page.locator('input[placeholder*="Wenceslas"]')).toHaveValue('Primary Direction Test');
        await expect(page.locator('input[type="number"]').first()).toHaveValue('2');
        await expect(page.locator('input[type="number"]').nth(1)).toHaveValue('3');
    });

    test('should add exit in reversed direction and persist values correctly', async ({ page }) => {
        // Navigate to Linka A -> To Nemocnice Motol (reversed) -> Můstek
        await page.click('text=Linka A');
        await page.click('text=To Nemocnice Motol');
        await page.click('text=Můstek');

        // Click Add New
        await page.click('text=+ Add New');

        // Fill in exit details
        await page.fill('input[placeholder*="Wenceslas"]', 'Reversed Direction Test');
        await page.fill('input[type="number"]', '4'); // Car
        await page.locator('input[type="number"]').nth(1).fill('2'); // Door

        // Save
        await page.click('text=Save Exit');
        await page.waitForTimeout(2000);

        // Verify exit appears in list with SAME values (not reversed)
        await expect(page.locator('text=Reversed Direction Test')).toBeVisible();
        const exitCard = page.locator('.exit-card', { hasText: 'Reversed Direction Test' });
        await expect(exitCard.locator('.position-box').first()).toContainText('4');
        await expect(exitCard.locator('.position-box').last()).toContainText('2');

        // Click to edit and verify values match what we entered
        await exitCard.click();
        await expect(page.locator('input[placeholder*="Wenceslas"]')).toHaveValue('Reversed Direction Test');
        await expect(page.locator('input[type="number"]').first()).toHaveValue('4');
        await expect(page.locator('input[type="number"]').nth(1)).toHaveValue('2');
    });

    test('should edit existing exit and preserve entered values', async ({ page }) => {
        // First add an exit
        await page.click('text=Linka A');
        await page.click('text=To Depo Hostivař');
        await page.click('text=Nemocnice Motol');
        await page.click('text=+ Add New');
        await page.fill('input[placeholder*="Wenceslas"]', 'Edit Test Exit');
        await page.fill('input[type="number"]', '1');
        await page.locator('input[type="number"]').nth(1).fill('1');
        await page.click('text=Save Exit');
        await page.waitForTimeout(2000);

        // Click to edit
        const exitCard = page.locator('.exit-card', { hasText: 'Edit Test Exit' });
        await exitCard.click();

        // Change values
        await page.locator('input[type="number"]').first().fill('3');
        await page.locator('input[type="number"]').nth(1).fill('4');
        await page.click('text=Save Exit');
        await page.waitForTimeout(2000);

        // Verify new values are displayed
        const updatedCard = page.locator('.exit-card', { hasText: 'Edit Test Exit' });
        await expect(updatedCard.locator('.position-box').first()).toContainText('3');
        await expect(updatedCard.locator('.position-box').last()).toContainText('4');

        // Click to edit again and verify persistence
        await updatedCard.click();
        await expect(page.locator('input[type="number"]').first()).toHaveValue('3');
        await expect(page.locator('input[type="number"]').nth(1)).toHaveValue('4');
    });

    test('should delete exit successfully', async ({ page }) => {
        // Add an exit first
        await page.click('text=Linka A');
        await page.click('text=To Depo Hostivař');
        await page.click('text=Nemocnice Motol');
        await page.click('text=+ Add New');
        await page.fill('input[placeholder*="Wenceslas"]', 'Delete Test Exit');
        await page.fill('input[type="number"]', '2');
        await page.locator('input[type="number"]').nth(1).fill('2');
        await page.click('text=Save Exit');
        await page.waitForTimeout(2000);

        // Click to edit
        const exitCard = page.locator('.exit-card', { hasText: 'Delete Test Exit' });
        await exitCard.click();

        // Click Delete and confirm
        page.on('dialog', dialog => dialog.accept());
        await page.click('text=Delete');
        await page.waitForTimeout(2000);

        // Verify exit is gone
        await expect(page.locator('text=Delete Test Exit')).not.toBeVisible();
    });

    test('should allow zero values for car and door', async ({ page }) => {
        await page.click('text=Linka A');
        await page.click('text=To Depo Hostivař');
        await page.click('text=Nemocnice Motol');
        await page.click('text=+ Add New');

        await page.fill('input[placeholder*="Wenceslas"]', 'Zero Values Test');
        await page.fill('input[type="number"]', '0');
        await page.locator('input[type="number"]').nth(1).fill('0');
        await page.click('text=Save Exit');
        await page.waitForTimeout(2000);

        // Verify zero values are displayed
        const exitCard = page.locator('.exit-card', { hasText: 'Zero Values Test' });
        await expect(exitCard.locator('.position-box').first()).toContainText('0');
        await expect(exitCard.locator('.position-box').last()).toContainText('0');
    });
});
