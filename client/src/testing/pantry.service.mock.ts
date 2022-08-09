/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { PantryService } from 'src/app/pantry/pantry.service';
import { Product, ProductCategory } from '../app/products/product';
import { PantryItem } from 'src/app/pantry/pantryItem';
import { CategorySortPantryItem } from 'src/app/pantry/categorysortPantryItem';
import { PantryDisplayItem } from 'src/app/pantry/pantryDisplayItem';

/**
 * A "mock" version of the `PantryService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockPantryService extends PantryService {
  static testPantryProducts: Product[] = [
    {
      _id: 'banana_id',
      productName: 'banana',
      description: '',
      brand: 'Dole',
      category: 'produce',
      store: 'Walmart',
      location: '',
      notes: '',
      tags: [],
      lifespan: 0,
      threshold: 0,
      image: ''
    },
    {
      _id: 'milk_id',
      productName: 'Whole Milk',
      description: '',
      brand: 'Land O Lakes',
      category: 'dairy',
      store: 'SuperValu',
      location: '',
      notes: '',
      tags: [],
      lifespan: 0,
      threshold: 0,
      image: ''
    },
    {
      _id: 'banana_id',
      productName: 'banana',
      description: '',
      brand: 'Dole',
      category: 'produce',
      store: 'Walmart',
      location: '',
      notes: '',
      tags: [],
      lifespan: 0,
      threshold: 0,
      image: ''
    },
    {
      _id: 'bread_id',
      productName: 'Wheat Bread',
      description: '',
      brand: 'Country Hearth',
      category: 'baked goods',
      store: 'Walmart',
      location: '',
      notes: '',
      tags: [],
      lifespan: 0,
      threshold: 0,
      image: ''
    }
  ];

  static testPantryItems: PantryItem[] = [
    {
      _id: 'first_banana',
      product: 'banana_id',
      purchase_date: new Date('2022-03-30')
    },
    {
      _id: 'sole_milk',
      product: 'milk_id',
      purchase_date: new Date('2020-07-16')
    },
    {
      _id: 'second_banana',
      product: 'banana_id',
      purchase_date: new Date('2022-03-31')
    },
    {
      _id: 'sole_bread',
      product: 'bread_id',
      purchase_date: new Date('2022-03-27')
    }
  ];

  static testPantryDisplayItems: PantryDisplayItem[] = [
    {
      _id: 'first_banana',
      product: MockPantryService.testPantryProducts[0],
      purchase_date: new Date('2022-03-30')
    },
    {
      _id: 'sole_milk',
      product: MockPantryService.testPantryProducts[1],
      purchase_date: new Date('2020-07-16')
    },
    {
      _id: 'second_banana',
      product: MockPantryService.testPantryProducts[0],
      purchase_date: new Date('2022-03-31')
    },
    {
      _id: 'sole_bread',
      product: MockPantryService.testPantryProducts[2],
      purchase_date: new Date('2022-03-27')
    }
  ];

  constructor() {
    super(null);
  }

  getPantryProducts(): Observable<Product[]> {
    // Just return the test products regardless of what filters are passed in
    return of(MockPantryService.testPantryProducts);
  }

  getPantry(): Observable<PantryItem[]> {
    return of(MockPantryService.testPantryItems);
  }

  getGroupedPantryItems(): Observable<CategorySortPantryItem[]> {
    const output: CategorySortPantryItem[] = [
      {
        category: 'baked goods',
        count: 1,
        pantryItems: [MockPantryService.testPantryDisplayItems[3]]
      },
      {
        category: 'dairy',
        count: 1,
        pantryItems: [MockPantryService.testPantryDisplayItems[1]]
      },
      {
        category: 'produce',
        count: 2,
        pantryItems: [MockPantryService.testPantryDisplayItems[0], MockPantryService.testPantryDisplayItems[2]]
      }
    ];
    return of(output);
  }

}
