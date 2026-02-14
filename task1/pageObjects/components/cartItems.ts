import type { Page } from '@playwright/test';
import { BasePageComponent } from '../base.pageComponent';
import InventoryItem from './inventoryItem';

export default class CartItems extends BasePageComponent {
  constructor(page: Page) {
    super(page.getByTestId('cart-list'));
  }

  async getItemByIndex(index: number): Promise<InventoryItem> {
    const itemsLocator = this.host.getByTestId('inventory-item');

    return new InventoryItem(this.host.page(), itemsLocator.nth(index));
  }
}
