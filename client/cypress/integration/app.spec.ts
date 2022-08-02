import { AppPage } from '../support/app.po';

const page = new AppPage();

describe('App', () => {
  beforeEach(() => page.navigateTo());

  it('Should have the correct title', () => {
    page.getAppTitle().should('contain', 'Handy Pantry');
  });

  it('Should have a working toolbar', () =>{
    page.getNavLink('Products').click();
    cy.url().should('match', /\/products$/);
    page.getNavLink('Pantry').click();
    cy.url().should('match', /^https?:\/\/[^\/]+\/?$/);
  });
});
