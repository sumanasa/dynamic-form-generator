import { test, expect } from '@playwright/test';

test('loads the dynamic form editor and form', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with your app URL

  // Validate that the JSON editor and preview load
  await expect(page.locator('textarea')).toBeVisible();
  await expect(page.locator('form')).toBeVisible();

  // Enter valid JSON in the editor
  await page.locator('textarea').fill(`{
      "formTitle": "Test Form",
      "formDescription": "Fill this form",
      "fields": [
        { "id": "name", "type": "text", "label": "Name", "required": true, "placeholder": "Enter your name" }
      ]
    }`);

  // Ensure the form updates in real-time
  await expect(page.locator('text=Test Form')).toBeVisible();
  await expect(page.locator('placeholder=Enter your name')).toBeVisible();

  // Listen for the alert
  let alertMessage = '';
  page.on('dialog', async (dialog) => {
    alertMessage = dialog.message(); // Capture the alert message
    await dialog.accept(); // Accept the alert to proceed
  });

  // Fill out the form and submit
  await page.locator('input[placeholder="Enter your name"]').fill('John Doe');
  await page.locator('text=Submit').click();

  // Verify the alert message
  expect(alertMessage).toBe('Form submitted successfully!');
});
