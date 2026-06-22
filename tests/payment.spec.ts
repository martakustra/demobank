import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data.ts';
import { LoginPage } from '../pages/login.page.ts';
import { PaymentPage } from '../pages/payment.page.ts';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await page.goto('/');

    // POB
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // await page.getByTestId('login-input').fill(userId);
    // await page.getByTestId('password-input').fill(userPassword);
    // await page.getByTestId('login-button').click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5667 8900 12233';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    const paymentPage = new PaymentPage(page);

    await paymentPage.transferReceiver.fill(transferReceiver);
    await paymentPage.transferAccount.fill(transferAccount);
    await paymentPage.transferAmount.fill(transferAmount);
    await paymentPage.doTransfer.click();
    await paymentPage.closeButton.click();

    // await page.getByTestId('transfer_receiver').fill(transferReceiver);
    // await page.getByTestId('form_account_to').fill(transferAccount);
    // await page.getByTestId('form_amount').fill(transferAmount);
    // await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    // await page.getByTestId('close-button').click();

    // Assert
    await expect(paymentPage.showMessage).toHaveText(expectedMessage);
  });
});
