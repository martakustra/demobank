import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data.ts';
import { LoginPage } from '../pages/login.page.ts';
import { PaymentPage } from '../pages/payment.page.ts';
import { PulpitPage } from '../pages/pulpit.page.ts';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await page.goto('/');

    // POB
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentLink.click();

    paymentPage = new PaymentPage(page);
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5667 8900 12233';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act

    await paymentPage.transferReceiver.fill(transferReceiver);
    await paymentPage.transferAccount.fill(transferAccount);
    await paymentPage.transferAmount.fill(transferAmount);
    await paymentPage.doTransfer.click();
    await paymentPage.closeButton.click();

    // Assert
    await expect(paymentPage.showMessage).toHaveText(expectedMessage);
  });
});
