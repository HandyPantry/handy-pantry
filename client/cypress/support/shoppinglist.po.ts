
export class ShoppinglistPage {

  navigateTo() {
    return cy.visit('./shoppinglist');
  }

  getUrl() {
    return cy.url();
  }

  getShoppinglistTitle() {
    return cy.get('.shoppinglist-title');
  }

  getInteractiveShoppingList() {
    return cy.get('.shopping-list-interactive');
  }

  clickInteractiveViewToggle() {
    return cy.get('#interactive-view-button').click();
  }

  /**
   * Get the store tabs on the interactive shoppinglist
   *
   * @param position the order of the store tab (first tab is '0')
   */
  getStoreTab(position: number) {
    return cy.get('.store-tabs-group .mat-tab-labels div[role="tab"]').eq(position);
  }

  /**
   *  Get the store group list of products
   *
   * @param position the order of the store list (first store grouping of items is '0')
   */
  getStoreProductsPanel(position: number) {
    return cy.get('.store-tabs-group .mat-tab-body[role="tabpanel"]').eq(position);
  }

  /**
   * Get all the items in the shopping list for the store at the
   * specified position.
   *
   * @param storePosition The position in the tab group of the desired
   * store; the left-most store is at position zero.
   * @returns the list of all the shopping list items for that store
   */
  getStoreItems(storePosition: number) {
    // Does this next line actually _do_ anything? We don't capture
    // the return value or act on it, so if it does do anything, it's
    // entirely via side-effects, which at a minimum means that the
    // name of `getStoreProductsPanel()` is dodgy.
    this.getStoreProductsPanel(storePosition);
    return cy.get('.shopping-list-item');
  }

  /**
   * Delete the first shopping list item for the store in the
   * specified position in the tab group. This finds the first item
   * for that store, and clicks the delete button for that item.
   *
   * @param storePosition The position in the tab group of the desired
   * store; the left-most store is at position zero.
   */
  deleteFirstItemInStore(storePosition: number) {
    return this.getStoreItems(storePosition).first().within((_$item) => {
      cy.get('[data-test=deleteItemButton]')
        .click();
    });
  }

  clickDialogDeleteButton() {
    return cy.get('[data-test=dialogDelete]').click();
  }

  /**
   * Change the shoppinglist view.
   *
   * @param viewType Which view type to change to: "interactive" or "print".
   */
   changeView(viewType: 'interactive' | 'print') {
    return cy.get(`[data-test=viewTypeGroup] #${viewType}-view-button`).trigger('click');
  }

  getPrintShoppingList() {
    return cy.get('.shopping-list-print');
  }

  getPrintButton() {
    return cy.get('.print-button');
  }

  resetShoppingListButton() {
    return cy.get('.reset-button');
  }
}
