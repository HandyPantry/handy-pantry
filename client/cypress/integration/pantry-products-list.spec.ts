import { PantryProductsListPage } from 'cypress/support/pantry-products-list.po';

describe('Pantry List Expansion Panels and tables', () => {

  beforeEach(() => {
    PantryProductsListPage.navigateTo();
    cy.wait(1000);
  });

  it('Should check that expansion panels have the correct titles and items by categories', () => {

    PantryProductsListPage.getExpansionTitleByCategory('baking supplies').should('have.text', ' baking supplies ');

    PantryProductsListPage.getTableProductNameByCategory('baking supplies').first().should('have.text', ' Almond Paste, 8 oz ');

    PantryProductsListPage.getTablePurchaseDateByCategory('baking supplies').first().should('have.text', ' 28/04/2022 ');

    PantryProductsListPage.getTableNotesByCategory('baking supplies')
      .first().should('contains.text', ' Expiration / Best Before: 01/2022 ');

    PantryProductsListPage.getExpansionTitleByCategory('meat').should('have.text', ' meat ');

    PantryProductsListPage.getTableProductNameByCategory('meat').first().should('have.text', ' Herring Fillets, 100 g ');

    PantryProductsListPage.getTablePurchaseDateByCategory('meat').first().should('have.text', ' 28/04/2022 ');

    PantryProductsListPage.getTableNotesByCategory('meat').first().should('contains.text', ' Expiration / Best Before: 10/2021 ');

  });

});

describe('RemovePantryItem() deletes an item from the pantry', () => {

  beforeEach(() => {
    PantryProductsListPage.navigateTo();
    cy.wait(1000);
  });

  it('Should click the remove button of the first element and read the dialog', () => {
    PantryProductsListPage.clickRemoveButton('staples');
    cy.get('mat-dialog-content').should('have.text', 'Remove Pure Maple Syrup, 16 Oz from your pantry?'
      + 'This action cannot be undone.');
  });

  it('Should delete an item from the pantry', () => {
    PantryProductsListPage.clickRemoveButton('meat');
    PantryProductsListPage.clickDeleteButton();
    cy.get('.mat-simple-snack-bar-content').should('contain.text', 'Item successfully removed from your pantry.');
  });
});
