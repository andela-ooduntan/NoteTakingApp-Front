import { AssessementePage } from './app.po';

describe('assessemente App', () => {
  let page: AssessementePage;

  beforeEach(() => {
    page = new AssessementePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
