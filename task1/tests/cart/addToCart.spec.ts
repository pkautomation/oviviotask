import { test, expect } from '../../pageObjects/pageFixtureUserLoggedIn';

test.describe('Add to cart', () => {
  test('Check whether item can be added to a cart', async ({ allItemsPage, cartPage }) => {
    const inventoryItem = await allItemsPage.inventoryItems.getItemByIndex(0);
    const expectedItemName = await inventoryItem.itemName.textContent();
    const expectedItemPrice = await inventoryItem.itemPrice.textContent();

    await allItemsPage.addElementToCartByIndex(0);
    await allItemsPage.navBar.openCart();

    const cartItem = await cartPage.getInventoryItemByIndex(0);
    const actualItemName = await cartItem.itemName.textContent();
    const actualItemPrice = await cartItem.itemPrice.textContent();

    expect.soft(actualItemName).toBe(expectedItemName);
    expect(actualItemPrice).toBe(expectedItemPrice);
  });
});
