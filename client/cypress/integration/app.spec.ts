import { AppPage } from '../support/app.po';

const page = new AppPage();

describe('App', () => {
  beforeEach(() => page.navigateTo());

  it('Should have a working toolbar', () => {
    cy.get('.toolbar-item').should('contain.text', 'My Pantry');
  });

  it('Should be able to go to the pages',() => {
    page.getNavLink('Products').click();
    cy.url().should('match', /\/products$/);
    page.getNavLink('Pantry').click();
    cy.url().should('not.match', /\/pantry$/);
    page.getNavLink('Shopping List').click();
    cy.url().should('match', /\/shoppinglist$/);
  });
});
