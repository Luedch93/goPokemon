import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getInputSearch() {
    return element(by.css('input'));
  }

  setSearchValue() {
    const inputEl = this.getInputSearch();
    inputEl.sendKeys('pikachu');
  }

  getCardsElements() {
    return element.all(by.css('.card'));
  }

  getCardElement() {
    return element(by.css('.card'));
  }

  getCardTitle() {
    return element(by.css('h4'));
  }

  clickCard() {
    element(by.css('.card')).click();
  }

  getDetailCard() {
    return element(by.css('detail-card'));
  }

  getPreviousButton() {
    const buttons = element.all(by.css('#navigation button'));
    return buttons.get(0);
  }

  getNextButton() {
    const buttons = element.all(by.css('#navigation button'));
    return buttons.get(1);
  }
}
