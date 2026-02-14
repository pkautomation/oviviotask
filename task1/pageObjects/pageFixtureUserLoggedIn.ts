import AllItemsPage from './pages/allItems.page';
import { test as base } from '@playwright/test';
import LoginPage from './pages/login.page';
import CartPage from './pages/cart.page';

export type PageObjects = {
  allItemsPage: AllItemsPage;
  loginPage: LoginPage;
  cartPage: CartPage;
  initializeFixture: void;
};

export const test = base.extend<PageObjects>({
  initializeFixture: [
    async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await loginPage.open();
      await loginPage.fillCredentials('standard_user', 'secret_sauce');
      await use();
    },
    { auto: true },
  ],
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  allItemsPage: async ({ page }, use) => {
    const allItemsPage = new AllItemsPage(page);
    await use(allItemsPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});

export { expect, Page, Locator, Response } from '@playwright/test';
