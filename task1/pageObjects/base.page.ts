import { type Page } from '@playwright/test';
import NavBar from './components/navBar';

export abstract class BasePage {
  public navBar: NavBar;

  constructor(readonly page: Page) {
    this.navBar = new NavBar(this.page.locator('.header_label').first());
  }

  async open(path: string) {
    await this.page.goto(path);
  }
}
