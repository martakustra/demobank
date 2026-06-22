import { Locator, Page } from '@playwright/test';

export class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  loginError: Locator;
  loginPasswordError: Locator;
  //await page.getByTestId('login-input').fill(userId);
  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId('login-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-button');
    this.loginError = this.page.getByTestId('error-login-id');
    this.loginPasswordError = this.page.getByTestId('error-login-password');
  }
}
