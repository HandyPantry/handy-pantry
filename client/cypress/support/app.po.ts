export class AppPage {
  static navigateTo() {
    return cy.visit('/');
  }

  static getNavLink(navOption: 'Pantry' | 'Products' | 'Shopping List') {
    return cy.contains('[routerlink] > .mat-list-item-content', navOption);
  }
}
