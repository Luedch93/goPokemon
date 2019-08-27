import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Detail App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate to detail', () => {
    page.navigateTo();
    page.clickCard();
    const detailCard = page.getDetailCard();
    expect(detailCard.isDisplayed()).toBeTruthy();
  });


  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
