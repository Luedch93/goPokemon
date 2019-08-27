import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Filter App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display only one card', () => {
    page.navigateTo();
    page.setSearchValue();
    expect(page.getCardsElements().count()).toEqual(1);
  });

  it('should display the correct pokemon', () => {
    page.navigateTo();
    page.setSearchValue();
    expect(page.getCardsElements().count()).toEqual(1);
    expect(page.getCardTitle().getText()).toEqual('Pikachu');
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
