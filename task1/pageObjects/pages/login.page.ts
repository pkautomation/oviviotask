import { BasePage } from '../base.page';
import AllItemsPage from './allItems.page';

export default class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByTestId('username');
  readonly passwordInput = this.page.getByTestId('password');
  readonly loginButton = this.page.getByTestId('login-button');
  readonly errorMessage = this.page.getByTestId('error');

  async fillCredentials(username: string, password: string): Promise<AllItemsPage> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    return new AllItemsPage(this.page);
  }

  async open() {
    await super.open('/');
  }
}
