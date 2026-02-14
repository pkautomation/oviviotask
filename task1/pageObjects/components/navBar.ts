import { BasePageComponent } from '../base.pageComponent';

export default class NavBar extends BasePageComponent {
  static readonly MenuItems = {
    AllItems: 'about-sidebar-link',
    About: 'about-sidebar-link',
    Logout: 'logout-sidebar-link',
    ResetAppState: 'reset-sidebar-link',
  } as const;

  readonly cartBadge = this.host.page().getByTestId('shopping-cart-badge');
  readonly loggedInHeader = this.host.locator('.app_logo');
  readonly expandSideMenuButton = this.host.getByTestId('open-menu');
  readonly hideSideMenuButton = this.host.getByTestId('close-menu');

  readonly searchInput = this.host.getByPlaceholder('Search for products...');

  async clickMenuItem(menuItem: keyof typeof NavBar.MenuItems) {
    await this.expandSideMenuButton.click();
    await this.host.getByTestId(NavBar.MenuItems[menuItem]).click();
  }

  async openCart() {
    await this.cartBadge.click();
  }
}
