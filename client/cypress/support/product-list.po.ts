import { ProductCategory } from 'src/app/products/product';
import { Product } from 'src/app/products/product';

export class ProductListPage {
  static navigateTo() {
    return cy.visit('./products');
  }

  static getUrl() {
    return cy.url();
  }

  static getProductListTitle() {
    return cy.get('.product-list-title');
  }

  static getFilteredProductListItems() {
    return cy.get('.filtered-product-list-item');
  }

  static getExpansionTitleByCategory(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel .' + category.replace(' ', '-') + '-panel-title');
  }

  static getExpansionItemsByCategory(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel .' + category.replace(' ', '-') + '-nav-list');
  }

  static selectCategory(value: ProductCategory) {
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
  static selectStore(value: string) {
    // Find and click the drop down
    return cy.get('[data-test=productStoreSelect]').click()
      // Select and click the desired value from the resulting menu
      .get(`mat-option`).contains(value).click({ force: true });
  }

  static addProductButton() {
    return cy.get('[data-test=addProductButton]');
  }

  static clickDeleteButton() {
    return this.getFilteredProductListItems()
      .first()
      .within(($product) => {
        cy.get('[data-test=deleteProductButton]')
          .click();
      });
  }

  static clickExpansionDeleteButton(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel')
      .click()
      .get('.' + category.replace(' ', '-') + '-nav-list')
      .first()
      .within(($product) => {
        cy.get('[data-test=deleteProductButton]')
          .click();
      });
  }

  static clickAddButton() {
    return this.getFilteredProductListItems()
      .first()
      .within(($product) => {
        cy.get('[data-test=addToPantryButton]')
          .click();
      });
  }

  static clickExpansionAddButton(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel')
      .click()
      .get('.' + category.replace(' ', '-') + '-nav-list')
      .first()
      .within(($product) => {
        cy.get('[data-test=addToPantryButton]')
          .click();
      });
  }

  static clickAddShoppingButton() {
    return this.getFilteredProductListItems()
      .first()
      .within(($product) => {
        cy.get('[data-test=addToShoppinglistButton]')
          .click();
      });
  }

  static clickExpansionAddShoppingButton(category: string) {
    return cy.get(`.${category.replace(' ', '-')}-expansion-panel`)
      .click()
      .get(`.${category.replace(' ', '-')}-nav-list`)
      .first()
      .within(($product) => {
        cy.get('[data-test=addToShoppinglistButton]')
          .click();
      });
  }

  static enterPurchaseDate(purchaseDate: string) {
    return cy.get('[data-test=date-picker-button]').type(purchaseDate);
  }

  static enterNotes(notes: string) {
    return cy.get('[data-test=notesInput]').type(notes);
  }

  static enterPantryQuantity(quantity: string) {
    return cy.get('[data-test=pantryQuantityInput]').clear().type(quantity);
  }

  static enterShoppingListCount(count: string) {
    return cy.get('[data-test=shoppingListCountInput]').type(count);
  }

  static clickDialogAddButton() {
    return cy.get('[data-test=confirmAddProductToPantryButton]').click();
  }

  static clickDialogAddShoppingButton() {
    return cy.get('[data-test=confirmAddProductToShoppinglistButton]').click({ force: true });
  }

  static clickDialogGoToShoppingButton() {
    return cy.get('[data-test=goToShoppingListButton]').click({ force: true });
  }

  static clickDialogDeleteButton() {
    return cy.get('[data-test=dialogDelete]').click();
  }

  static getAddProductFormField(fieldName: string) {
    return cy.get(`mat-form-field [formControlName=${fieldName}]`);
  }

  static selectMatSelectValue(select: Cypress.Chainable, value: string) {
    return select.click().get(`mat-option[value="${value}"]`).click();
  }

  static addProductSubmitButton() {
    return cy.get('[data-test="confirmProductButton"]');
  }

  static addNewProductToDatabase(product: Product) {
    cy.visit('/products/new');

    this.getAddProductFormField('productName').type(product.productName);
    this.getAddProductFormField('brand').type(product.brand);
    this.selectMatSelectValue(cy.get('[formControlName=store]'), product.store);
    this.getAddProductFormField('location').type(product.location);
    this.selectMatSelectValue(cy.get('[formControlName=category]'), product.category);

    return this.addProductSubmitButton().click();
  }
}
