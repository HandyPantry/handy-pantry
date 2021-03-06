import { ProductCategory } from 'src/app/products/product';
import { Product } from 'src/app/products/product';

export class ProductListPage {
  navigateTo() {
    return cy.visit('./products');
  }

  getUrl() {
    return cy.url();
  }

  getProductListTitle() {
    return cy.get('.product-list-title');
  }

  getFilteredProductListItems() {
    return cy.get('.filtered-product-list-item');
  }

  getExpansionTitleByCategory(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel .' + category.replace(' ', '-') + '-panel-title');
  }

  getExpansionItemsByCategory(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel .' + category.replace(' ', '-') + '-nav-list');
  }

  selectCategory(value: ProductCategory) {
    // Find and click the drop down
    return cy.get('[data-test=productCategorySelect]').click()
      // Select and click the desired value from the resulting menu
      .get(`mat-option`).contains(value, { matchCase: false }).click({ force: true });
  }

  /**
   * Selects a store to filter in the "Category" selector.
   *
   * @param value The store *value* to select, this is what's found in the mat-option "value" attribute.
   */
  selectStore(value: string) {
    // Find and click the drop down
    return cy.get('[data-test=productStoreSelect]').click()
      // Select and click the desired value from the resulting menu
      .get(`mat-option`).contains(value).click({ force: true });
  }

  addProductButton() {
    return cy.get('[data-test=addProductButton]');
  }

  clickDeleteButton() {
    return this.getFilteredProductListItems()
      .first()
      .within(($product) => {
        cy.get('[data-test=deleteProductButton]')
          .click();
      });
  }

  clickExpansionDeleteButton(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel')
      .click()
      .get('.' + category.replace(' ', '-') + '-nav-list')
      .first()
      .within(($product) => {
        cy.get('[data-test=deleteProductButton]')
          .click();
      });
  }

  clickAddButton() {
    return this.getFilteredProductListItems()
      .first()
      .within(($product) => {
        cy.get('[data-test=addToPantryButton]')
          .click();
      });
  }

  clickExpansionAddButton(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel')
      .click()
      .get('.' + category.replace(' ', '-') + '-nav-list')
      .first()
      .within(($product) => {
        cy.get('[data-test=addToPantryButton]')
          .click();
      });
  }

  clickAddShoppingButton() {
    return this.getFilteredProductListItems()
      .first()
      .within(($product) => {
        cy.get('[data-test=addToShoppinglistButton]')
          .click();
      });
  }

  clickExpansionAddShoppingButton(category: string) {
    return cy.get(`.${category.replace(' ', '-')}-expansion-panel`)
      .click()
      .get(`.${category.replace(' ', '-')}-nav-list`)
      .first()
      .within(($product) => {
        cy.get('[data-test=addToShoppinglistButton]')
          .click();
      });
  }

  enterPurchaseDate(purchaseDate: string) {
    return cy.get('[data-test=date-picker-button]').type(purchaseDate);
  }

  enterNotes(notes: string) {
    return cy.get('[data-test=notesInput]').type(notes);
  }

  enterPantryQuantity(quantity: string) {
    return cy.get('[data-test=pantryQuantityInput]').clear().type(quantity);
  }

  enterShoppingListCount(count: string) {
    return cy.get('[data-test=shoppingListCountInput]').type(count);
  }

  clickDialogAddButton() {
    return cy.get('[data-test=confirmAddProductToPantryButton]').click();
  }

  clickDialogAddShoppingButton() {
    return cy.get('[data-test=confirmAddProductToShoppinglistButton]').click({ force: true });
  }

  clickDialogGoToShoppingButton() {
    return cy.get('[data-test=goToShoppingListButton]').click({ force: true });
  }

  clickDialogDeleteButton() {
    return cy.get('[data-test=dialogDelete]').click();
  }

  getAddProductFormField(fieldName: string) {
    return cy.get(`mat-form-field [formControlName=${fieldName}]`);
  }

  selectMatSelectValue(select: Cypress.Chainable, value: string) {
    return select.click().get(`mat-option[value="${value}"]`).click();
  }

  addProductSubmitButton() {
    return cy.get('[data-test="confirmProductButton"]');
  }

  addNewProductToDatabase(product: Product) {
    cy.visit('/products/new');

    this.getAddProductFormField('productName').type(product.productName);
    this.getAddProductFormField('brand').type(product.brand);
    this.selectMatSelectValue(cy.get('[formControlName=store]'), product.store);
    this.getAddProductFormField('location').type(product.location);
    this.selectMatSelectValue(cy.get('[formControlName=category]'), product.category);

    return this.addProductSubmitButton().click();
  }
}
