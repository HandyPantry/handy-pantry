export class AppPage {
  navigateTo() {
    return cy.visit('/');
  }

  getNavLink(navOption: 'Pantry' | 'Products') {
    return cy.contains('[routerlink] > .mat-list-item-content', `${navOption}`);
  }
}
