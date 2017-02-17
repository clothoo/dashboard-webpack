import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have Dashboard link', () => {
    let subject = element(by.css('a.dashboard-nav-button')).getText();
    let result = 'Dashboard';
    expect(subject).toEqual(result.toUpperCase());
  });

});
