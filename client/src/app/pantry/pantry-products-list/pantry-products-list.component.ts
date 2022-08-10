/* eslint-disable prefer-const */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Product, ProductCategory } from 'src/app/products/product';
import { PantryItem } from '../pantryItem';
import { PantryService } from '../pantry.service';
import { ComboItem } from '../pantryItem';
import { Router } from '@angular/router';
import { DeletePantryItemComponent } from './delete-pantry-item/delete-pantry-item.component';
import { MatDialog } from '@angular/material/dialog';
import { CategorySortPantryItem } from '../CategorySortPantryItem';
import { PantryDisplayItem } from '../pantryDisplayItem';

@Component({
  selector: 'app-pantry-products-list',
  styleUrls: ['./pantry-products-list.component.scss'],
  templateUrl: './pantry-products-list.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class PantryProductsListComponent implements OnInit {
  // Unfiltered lists
  public matchingProducts: Product[];
  public pantryInfo: PantryItem[];
  public comboItems: ComboItem[] = [];


  public groupedPantryItems: CategorySortPantryItem[] = [];



  // Unique pantry & product combo object list
  public uniqueComboItems: ComboItem[];

  getProductsSub: Subscription;
  getPantrySub: Subscription;
  getGroupedPantryItemsSub: Subscription;

  // A list of the categories to be displayed, requested by the customer
  public categories: ProductCategory[] = [
    'baked goods',
    'baking supplies',
    'beverages',
    'cleaning products',
    'dairy',
    'deli',
    'frozen foods',
    'herbs/spices',
    'meat',
    'miscellaneous',
    'paper products',
    'pet supplies',
    'produce',
    'staples',
    'toiletries',
  ];

  // Stores the products sorted by their category
  public categoryNameMap = new Map<ProductCategory, CategorySortPantryItem>();

  // Columns displayed
  displayedColumns: string[] = ['productName', 'brand', 'purchase_date', 'remove'];
  expandedElement: PantryItem | null;

  /**
   * This constructor injects both an instance of `PantryService`
   * and an instance of `MatSnackBar` into this component.
   *
   * @param pantryService the `PantryService` used to get products in the pantry
   * @param snackBar the `MatSnackBar` used to display feedback
   */
  constructor(private pantryService: PantryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) {
    // Nothing here – everything is in the injection parameters.
  }

  getGroupedPantryItemsFromServer() {
    this.unsubGroupedPantryItems();
    this.pantryService.getGroupedPantryItems().subscribe(returnedPantryItems => {
      this.groupedPantryItems = returnedPantryItems;
      this.inititalizeCategoryMap();
    }, err => {
      console.error(err);
    });
  }

  inititalizeCategoryMap() {
    for (let categoryItem of this.groupedPantryItems) {
      this.categoryNameMap.set(categoryItem.category, categoryItem);
    }
    //Fill out all empty categories
    for (let productCategory of this.categories) {
      if (!this.categoryNameMap.has(productCategory)) {
        this.categoryNameMap.set(productCategory, {
          category: productCategory,
          count: 0,
          pantryItems: []
        });
      }
    }
  }

  /*
  * Starts an asynchronous operation to update the pantry
  */
  ngOnInit(): void {
    this.getGroupedPantryItemsFromServer();
  }

  unsubGroupedPantryItems() {
    if (this.getGroupedPantryItemsSub) {
      this.getGroupedPantryItemsSub.unsubscribe();
    }
  }

  /* istanbul ignore next */
  reloadComponent() {
    const pantryPageUrl = '';
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([pantryPageUrl]);
  }

  //Pops up a dialog to delete an item from the pantry
  /* istanbul ignore next */
  removePantryItem(givenItem: PantryDisplayItem): void {
    const dialogRef = this.dialog.open(DeletePantryItemComponent, { data: givenItem });
    dialogRef.afterClosed().subscribe(
      result => {
        this.pantryService.deleteItem(result).subscribe(returnedProductId => {
          if (returnedProductId) {
            this.snackBar.open('Item successfully removed from your pantry.', 'OK', { duration: 5000 });
            this.reloadComponent();
          }
          else {
            this.snackBar.open('Something went wrong.  The item was not removed from your pantry.', 'OK', { duration: 5000 });
          }
        });
      });
  }
}
