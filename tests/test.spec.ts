import { test, expect } from '@playwright/test';

test('Pos_Fun_0001 - Convert a simple present tense daily action sentence', async ({ page }) => {
  // Navigate to the translation website
  await page.goto('https://www.swifttranslator.com/');

  // Test case data from Excel
  const testCaseId = 'Pos_Fun_0001';
  const inputText = 'puusaa bath kanavaa.';
  const expectedOutput = 'පූසා බත් කනවා.';

  // Find the input field and enter the Singlish text
  // Adjust the selector based on the actual website structure
  const inputField = page.locator('input[type="text"], textarea').first();
  await inputField.fill(inputText);

  // Wait a moment for the real-time conversion
  await page.waitForTimeout(1000);

  // Find the output field and get the actual output
  // Adjust the selector based on the actual website structure
  const outputField = page.locator('.output-field, .result, .translation-result, [id*="output"]').first();
  const actualOutput = await outputField.textContent();

  // Log the results for debugging
  console.log(`Test Case: ${testCaseId}`);
  console.log(`Input: ${inputText}`);
  console.log(`Expected Output: ${expectedOutput}`);
  console.log(`Actual Output: ${actualOutput}`);

  // Assert that the actual output matches the expected output
  expect(actualOutput?.trim()).toBe(expectedOutput.trim());

  // Additional assertion to ensure the output is not empty
  expect(actualOutput?.trim()).not.toBe('');
  expect(actualOutput?.trim()).not.toBeNull();
});

// You can add more test cases by duplicating this structure