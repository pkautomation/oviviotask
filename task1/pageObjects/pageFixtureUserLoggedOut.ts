import AllItemsPage from './pages/allItems.page';
import { test as base } from '@playwright/test';
import LoginPage from './pages/login.page';

export type PageObjects = {
  allItemsPage: AllItemsPage;
  loginPage: LoginPage;
};

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  allItemsPage: async ({ page }, use) => {
    const allItemsPage = new AllItemsPage(page);
    await use(allItemsPage);
  },
});

export { expect, Page, Locator, Response } from '@playwright/test';
