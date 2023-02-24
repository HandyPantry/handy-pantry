
export class PantryProductsListPage {

  static navigateTo() {
    return cy.visit('./');
  }

  static getUrl() {
    return cy.url();
  }

  static getProductListTitle() {
    return cy.get('.pantry-products-list-title');
  }

  static getExpansionTitleByCategory(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel .' + category.replace(' ', '-') + '-panel-title');
  }

  static getTableProductNameByCategory(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel .' + category.replace(' ', '-')
      + '-table tbody tr .cdk-column-productName');
  }

  static getTableNotesByCategory(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel .' + category.replace(' ', '-')
      + '-table tbody tr .pantry-detail-description');
  }

  static getTablePurchaseDateByCategory(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel .' + category.replace(' ', '-')
      + '-table tbody tr .cdk-column-purchase_date');
  }

  static clickRemoveButton(category: string) {
    return cy.get('.' + category.replace(' ', '-') + '-expansion-panel')
      .click()
      .get('.' + category.replace(' ', '-')
        + '-table tbody tr .cdk-column-remove [data-test=deleteItemButton]')
      .first()
      .click();
  }

  static clickDeleteButton() {
    return cy.get('[data-test=dialogDelete]').click();
  }

}
