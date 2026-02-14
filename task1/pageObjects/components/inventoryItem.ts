import type { Page } from '@playwright/test';
import { BasePageComponent } from '../base.pageComponent';

export default class InventoryItem extends BasePageComponent {
  readonly itemName = this.host.getByTestId('inventory-item-name');
  readonly itemPrice = this.host.getByTestId('inventory-item-price');
  readonly removeButton = this.host.locator('[data-test^="remove-"]');
  readonly addButton = this.host.locator('[data-test^="add-to-cart-"]');

  constructor(page: Page, locator = page.getByTestId('inventory-item')) {
    super(locator);
  }
}
