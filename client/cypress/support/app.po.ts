export class AppPage {
  navigateTo() {
    return cy.visit('/');
  }

  getAppTitle() {
    return cy.get('.app-title');
  }

  getNavLink(navOption: 'Pantry' | 'Products') {
    return cy.contains('[routerlink] > .mat-list-item-content', `${navOption}`);
  }
}
