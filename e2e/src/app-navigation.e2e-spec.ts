import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Navigation App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a diasbled previous button', () => {
    page.navigateTo();
    const button = page.getPreviousButton();
    expect(button.isEnabled()).toBe(false);
  });

  it('should display new pokemons after click next', () => {
    page.navigateTo();
    const nextButton = page.getNextButton();
    const prevButton = page.getPreviousButton();
    nextButton.click();
    expect(prevButton.isEnabled()).toBe(true);
  });


  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
