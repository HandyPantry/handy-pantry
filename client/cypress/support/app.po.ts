export class AppPage {
  navigateTo() {
    return cy.visit('/');
  }

  getNavLink(navOption: 'Pantry' | 'Products' | 'ShoppingList') {
    return cy.contains('[routerlink] > .mat-list-item-content', navOption);
  }
}
