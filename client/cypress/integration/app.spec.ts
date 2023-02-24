import { AppPage } from '../support/app.po';

describe('App', () => {
  beforeEach(() => AppPage.navigateTo());

  it('Should have a working toolbar', () => {
    cy.get('.toolbar-item').should('contain.text', 'My Pantry');
  });

  it('Should be able to go to the pages', () => {
    AppPage.getNavLink('Products').click();
    cy.url().should('match', /\/products$/);
    AppPage.getNavLink('Pantry').click();
    cy.url().should('not.match', /\/pantry$/);
    AppPage.getNavLink('Shopping List').click();
    cy.url().should('match', /\/shoppinglist$/);
  });
});
