import { PantryProductsListPage } from 'cypress/support/pantry-products-list.po';

const page = new PantryProductsListPage();

describe ('Pantry List Expansion Panels and tables', () => {

  beforeEach(() => {
    page.navigateTo();
    cy.wait(1000);
  });

  it('Should check that expansion panels have the correct titles and items by categories', () => {

    page.getExpansionTitleByCategory('baking supplies').should('have.text', ' baking supplies (5) ');

    page.getTableProductNameByCategory('baking supplies').first().should('have.text', ' Active Dry Yeast, 4 oz ');

    page.getTablePurchaseDateByCategory('baking supplies').first().should('have.text', ' 28/04/2022 ');

    page.getTableNotesByCategory('baking supplies').first().should('contains.text', ' Expiration / Best Before: 08/2022 ');

    page.getExpansionTitleByCategory('meat').should('have.text', ' meat (13) ');

    page.getTableProductNameByCategory('meat').first().should('have.text', ' Anchovies in Olive Oil, 2 oz ');

    page.getTablePurchaseDateByCategory('meat').first().should('have.text', ' 28/04/2022 ');

    page.getTableNotesByCategory('meat').first().should('contains.text', ' Expiration / Best Before: 08/2021 ');

  });

});

describe ('RemovePantryItem() deletes an item from the pantry', () => {

  beforeEach(() => {
    page.navigateTo();
    cy.wait(1000);
  });

  it('Should click the remove button of the first element and read the dialog', () => {
  page.clickRemoveButton('staples');
  cy.get('mat-dialog-content').should('have.text', 'Remove Chicken Instant Bullion Cubes, 92 G from your pantry?'
  +'This action cannot be undone.');
  });

  it('Should delete an item from the pantry', () => {
    page.clickRemoveButton('meat');
    page.clickDeleteButton();
    cy.get('.mat-simple-snack-bar-content').should('contain.text', 'Item successfully removed from your pantry.');
  });
});
