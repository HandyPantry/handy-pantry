export class AppPage {
  navigateTo() {
    return cy.visit('/');
  }

  getNavLink(navOption: 'Pantry' | 'Products' | 'Shopping List') {
    return cy.contains('[routerlink] > .mat-list-item-content', `${navOption}`);
  }
}
