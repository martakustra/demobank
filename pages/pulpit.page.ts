import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';

export class PulpitPage {
  topUpButton: Locator;
  closeButton: Locator;
  doTransfer: Locator;
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  topUpReceiver: Locator;
  topUpAmount: Locator;
  topUpAgreement: Locator;
  showMessage: Locator;
  moneyValue: Locator;
  userNameText: Locator;
  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.topUpButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.closeButton = this.page.getByTestId('close-button');
    this.doTransfer = this.page.getByRole('button', { name: 'wykonaj' });
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.topUpReceiver = this.page.locator('#widget_1_topup_receiver');
    this.topUpAmount = this.page.locator('#widget_1_topup_amount');
    this.topUpAgreement = this.page.locator(
      '#uniform-widget_1_topup_agreement > span',
    );
    this.showMessage = this.page.locator('#show_messages');
    this.moneyValue = this.page.locator('#money_value');
    this.userNameText = this.page.getByTestId('user-name');

    this.sideMenu = new SideMenuComponent(this.page);
  }
}
