import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Login tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test(
    'successful login with correct credentials',
    {
      tag: ['@login', '@smoke'],
      annotation: {
        type: 'Happy path',
        description: 'Basic happy path for login',
      },
    },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const userPassword = loginData.userPassword;
      const expectedUserName = 'Jan Demobankowy';

      // Act
      await loginPage.login(userId, userPassword);

      // Assert
      const pulpitPage = new PulpitPage(page);
      await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
    },
  );

  test(
    'unsuccessful login with too short login',
    { tag: ['@login', '@unhappy_path'] },
    async ({ page }) => {
      // Arrange
      const userIdWrong = 'teserLO';
      const errorMessageId = 'identyfikator ma min. 8 znaków';

      // Act
      await loginPage.loginInput.fill(userIdWrong);
      await loginPage.loginInput.blur();

      // Assert
      await expect(loginPage.loginError).toHaveText(errorMessageId);
    },
  );

  test(
    'unsuccessful login with too short password',
    { tag: ['@login', '@unhappy_path'] },
    async ({ page }) => {
      // Arrange
      const userId = 'testerLO';
      const userPasswordWrong = '123';
      const errorMessagePassword = 'hasło ma min. 8 znaków';

      // Act
      await loginPage.loginInput.fill(userId);
      await loginPage.passwordInput.fill(userPasswordWrong);
      await loginPage.passwordInput.blur();

      // Assert
      await expect(loginPage.loginPasswordError).toHaveText(
        errorMessagePassword,
      );
    },
  );
});
