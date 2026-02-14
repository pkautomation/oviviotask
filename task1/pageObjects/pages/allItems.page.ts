import { BasePage } from '../base.page';

import InventoryItems from '../components/inventoryItems';

export default class AllItemsPage extends BasePage {
  readonly inventoryItems = new InventoryItems(this.page);

  async open() {
    await super.open('/');
  }

  async addElementToCartByIndex(index: number) {
    const item = await this.inventoryItems.getItemByIndex(index);
    await item.addButton.click();
  }
}
