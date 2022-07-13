import { ShoppinglistPage } from '../support/shoppinglist.po';

const page = new ShoppinglistPage();

describe('Shoppinglist', () => {
  beforeEach(() => {
    cy.task('seed:database');
    page.navigateTo();
  });

  it('Should have the correct url', () => {
    page.getUrl().should('match', /\/shoppinglist/);
  });

  it('Should have the correct title', () => {
    page.getShoppinglistTitle().should('have.text', 'My Shopping List');
  });

  it('Should have a print button on the print view', () => {
    page.changeView('print');
    page.getPrintButton().should('exist').and('have.attr', 'printSectionId', 'print');
  });
});

describe('Interactive Shoppinglist', () => {
  beforeEach(() => {
    cy.task('seed:database');
    page.navigateTo();
    page.changeView('interactive');
  });

  // We probably want to delete `getStoreTab()` since that's pretty
  // fragile by position, and switch everything to using `getStoreTabByName()`
  // instead. TBH, I'm not thrilled about getting them by name (lots of things
  // will break when we fix the spelling of "Willie's", for example), but
  // I can't figure out how to propagate `data-test` attributes through a
  // `mat-tab` element from Angular Material.
  it('Should have store tabs', () => {
    page.getStoreTab(0).should('exist').and('have.text', 'Other Store');
    page.getStoreTab(1).should('exist').and('have.text', 'Pomme de Terre');
    page.getStoreTab(2).should('exist').and('have.text', 'RealFoodHub');
    page.getStoreTab(3).should('exist').and('have.text', 'Willies');
  });

  it('Should have store tabs by name', () => {
    page.getStoreTabByName('Other Store').should('exist');
    page.getStoreTabByName('Willies');
    page.getStoreTabByName('Pomme de Terre');
    page.getStoreTabByName('RealFoodHub');
  });

  it('Should have products', () => {
    page.getStoreProductsPanel(0).should('exist');
    page.getStoreProductsPanel(1).should('exist');
    page.getStoreProductsPanel(2).should('exist');
    page.getStoreProductsPanel(3).should('exist');

    // check first item of panel 0 has correct name
    page.getStoreItems(0).first();//.should('contain.text', 'Cheese'); can't check text until items are sorted (randomized from server rn)
  });
});

describe('Print Shoppinglist', () => {
  beforeEach(() => {
    cy.task('seed:database');
    page.navigateTo();
    page.changeView('print');
  });

  it('Should have the correct store lists and products', () => {
    page.getPrintShoppingList();
    cy.get('h2').first().should('contain.text', 'Other Store');
  });
});

describe('Reset the Shoppinglist', () => {
  beforeEach(() => {
    cy.task('seed:database');
    page.navigateTo();
  });

  it('should have the seed data in the store', () => {
    // there should be 4 'Other Store' items
    page.getStoreItems(0).should('have.length', 3);
  });

  it('should repopulate the shopping list when the "RESET SHOPPING LIST" button is pressed', () => {
    cy.wait(1000);
    page.resetShoppingListButton().click();
    // re-navigate to the page to work around the page refresh
    page.navigateTo();
    // The shopping list should have new items
    page.getStoreItems(0).should('have.length', 6);
  });
});

describe('Delete from Shopping List', () => {

  beforeEach(() => {
    cy.task('seed:database');
    page.navigateTo();
    cy.wait(1000);
  });

  describe('Deleting from the left-most store', () => {
    const storePos = 0;
    let originalNumItems: number;

    beforeEach(() => {
      // Is this really a reasonable way to do this?
      // I got the idea from https://stackoverflow.com/a/68815811
      // and it seems to work, but I'm not super sold on it.
      // I don't really like that we have to have this beforeEach
      // to capture the previous value. I'm also not sure how or if we
      // know that the `then` here will actually have run
      // before we start the next `it`. If doesn't, then we could
      // get race conditions where sometimes `originalNumItems` is
      // properly initialized, and sometimes it isn't. – Nic
      page.getStoreItems(storePos)
          .its('length')
          .then(len => originalNumItems = len);
    });

    it('Clicking the delete button on the first item should reduce the number of items by one', () => {
      page.deleteFirstItemInStore(storePos);
      page.clickDialogDeleteButton();
      page.getStoreItems(storePos).should('have.length', originalNumItems-1);
    });

    // TODO:
    //   - Test for deleting something other than only the first
    //     item in a given store's shopping list.
    //   - Test for deleting something from something other than
    //     the first (left-most) store.
  });

  describe('Deleting from Pomme de Terre', () => {
    const storeName = 'Pomme de Terre';
    let originalNumItems: number;

    beforeEach(() => {
      page.getStoreItemsByName(storeName)
        .its('length')
        .then(len => originalNumItems = len);
    });

    it('Clicking the delete button on the first item should reduce the number of items by one', () => {
      console.log(originalNumItems);
      page.deleteFirstItemInStoreByName(storeName);
      page.clickDialogDeleteButton();
      // Add a SnackBar to the UI, and then I can wait for it to appear and disappear
      // before moving on? I also need to look at how this page redraws after deletion
      // to see how icky that is.
      cy.wait(1000);
      console.log(originalNumItems);
      page.getStoreItemsByName(storeName).should('have.length', originalNumItems - 1);
    });

    // TODO:
    //   - Test for deleting something other than only the first
    //     item in a given store's shopping list.
    //   - Test for deleting something from something other than
    //     the first (left-most) store.
  });
});
