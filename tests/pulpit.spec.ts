import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await page.goto('/');
    // POB
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act
    const pulpitPage = new PulpitPage(page);

    await pulpitPage.transferReceiver.selectOption(receiverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);
    await pulpitPage.doTransfer.click();
    await pulpitPage.closeButton.click();

    await page.waitForLoadState('domcontentloaded');

    // Assert
    await expect(pulpitPage.showMessage).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const receiverId = '500 xxx xxx';
    const topupAmount = '40';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${receiverId}`;

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topUpReceiver.selectOption(receiverId);
    await pulpitPage.topUpAmount.fill(topupAmount);
    await pulpitPage.topUpAgreement.click();
    await pulpitPage.topUpButton.click();
    await pulpitPage.closeButton.click();

    await page.waitForLoadState('domcontentloaded');

    // Assert
    await expect(pulpitPage.showMessage).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const receiverId = '500 xxx xxx';
    const topupAmount = '50';
    const initialBalance = await pulpitPage.moneyValue.innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    // Act
    await pulpitPage.topUpReceiver.selectOption(receiverId);
    await pulpitPage.topUpAmount.fill(topupAmount);
    await pulpitPage.topUpAgreement.click();
    await pulpitPage.topUpButton.click();
    await pulpitPage.closeButton.click();

    await page.waitForLoadState('domcontentloaded');

    // Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
