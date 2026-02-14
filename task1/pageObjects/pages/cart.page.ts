import { BasePage } from '../base.page';
import CartItems from '../components/cartItems';
import InventoryItem from '../components/inventoryItem';

export default class CartPage extends BasePage {
  readonly cartItems = new CartItems(this.page);

  async open() {
    await super.open('/');
  }

  async getInventoryItemByIndex(index: number): Promise<InventoryItem> {
    return this.cartItems.getItemByIndex(index);
  }
}
