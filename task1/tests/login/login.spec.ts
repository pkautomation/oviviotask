import { test, expect } from '../../pageObjects/pageFixtureUserLoggedOut';

test.describe('Login tests', () => {
  test('Check if login with valid user redirects to home page', async ({
    allItemsPage,
    loginPage,
  }) => {
    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Enter username and password', async () => {
      await loginPage.fillCredentials('standard_user', 'secret_sauce');
    });

    await test.step('Verify if user landed on home page', async () => {
      await expect.soft(allItemsPage.navBar.loggedInHeader).toBeVisible();
      await expect.soft(allItemsPage.navBar.loggedInHeader).toContainText('Swag Labs');

      await expect(allItemsPage.page).toHaveURL(/inventory.html/);
    });
  });

  test('Check if login with locked out user keeps user on login page', async ({
    allItemsPage,
    loginPage,
  }) => {
    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Enter username and password', async () => {
      await loginPage.fillCredentials('locked_out_user', 'secret_sauce');
    });

    await test.step('Verify if user remains on login page and error message is displayed', async () => {
      await expect.soft(loginPage.errorMessage).toBeVisible();
      await expect
        .soft(loginPage.errorMessage)
        .toHaveText('Epic sadface: Sorry, this user has been locked out.');

      await expect(allItemsPage.page).toHaveURL('/');
    });
  });
});
