import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Login tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange

    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short login', async ({ page }) => {
    // Arrange
    const userIdWrong = 'teserLO';
    const errorMessageId = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userIdWrong);
    await page.getByTestId('login-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(errorMessageId);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = 'testerLO';
    const userPasswordWrong = '123';
    const errorMessagePassword = 'hasło ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPasswordWrong);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      errorMessagePassword,
    );
  });
});
