import { ExampleryappPage } from './app.po';

describe('exemplary app', () => {
  let page: ExampleryappPage;

  beforeEach(() => {
    page = new ExampleryappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
