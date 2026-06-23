import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

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
    // POB
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(loginPage.loginUserName).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short login', async ({ page }) => {
    // Arrange
    const userIdWrong = 'teserLO';
    const errorMessageId = 'identyfikator ma min. 8 znaków';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userIdWrong);
    await loginPage.loginInput.blur();

    // Assert
    await expect(loginPage.loginError).toHaveText(errorMessageId);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = 'testerLO';
    const userPasswordWrong = '123';
    const errorMessagePassword = 'hasło ma min. 8 znaków';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPasswordWrong);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.loginPasswordError).toHaveText(errorMessagePassword);
  });
});
