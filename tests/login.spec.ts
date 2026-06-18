import { test, expect } from '@playwright/test';

test.describe("Login tests", () => {
  test('successful login with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('abcdefgg');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('user-name')).toHaveText("Jan Demobankowy");
  });

  test('unsuccessful login with too short login', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('teserLO');
    await page.getByTestId('login-input').blur();
    await expect(page.getByTestId('error-login-id')).toHaveText("identyfikator ma min. 8 znaków");
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('123');
    await page.getByTestId('password-input').blur();
    await expect(page.getByTestId('error-login-password')).toHaveText("hasło ma min. 8 znaków");
  });
});