/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from '../products/product';
import { PantryItem } from './pantryItem';

import { PantryService } from './pantry.service';
import { CategorySortPantryItem } from './categorysortPantryItem';
import { PantryDisplayItem } from './pantryDisplayItem';

describe('PantryService', () => {

  const testPantryProducts: Product[] = [
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

  const testPantryItems: PantryItem[] = [
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

  const testPantryDisplayItems: PantryDisplayItem[] = [
    {
     _id: 'first_banana',
     product: testPantryProducts[0],
     purchase_date: new Date('2022-03-30')
    },
    {
     _id: 'sole_milk',
     product: testPantryProducts[1],
     purchase_date: new Date('2020-07-16')
    },
    {
     _id: 'second_banana',
     product: testPantryProducts[0],
     purchase_date: new Date('2022-03-31')
    },
    {
     _id: 'sole_bread',
     product: testPantryProducts[2],
     purchase_date: new Date('2022-03-27')
    }
  ];

  const testGroupedPantryItems: CategorySortPantryItem[] = [
    {
      category: 'baked goods',
      count: 1,
      pantryItems: [ testPantryDisplayItems[3] ]
    },
    {
      category: 'dairy',
      count: 1,
      pantryItems: [ testPantryDisplayItems[1] ]
    },
    {
      category: 'produce',
      count: 2,
      pantryItems: [ testPantryDisplayItems[0], testPantryDisplayItems[2] ]
    }
  ];

  let pantryService: PantryService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    pantryService = new PantryService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getGroupedProducts calls api/pantry-by-category', () => {
    pantryService.getGroupedPantryItems().subscribe(
      products => expect(products).toBe(testGroupedPantryItems)
    );

    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(`${pantryService.pantryUrl}-by-category`)
    );
    expect(req.request.method).toEqual('GET');
  });

  it('addPantryItem makes a POST request to /api/pantry', () => {
    //The method should return the id of the sent pantry item
    pantryService.addPantryItem(testPantryItems[0]).subscribe(
      (id) => expect(id).toEqual(testPantryItems[0]._id)
    );

    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(pantryService.pantryUrl)
    );
    expect(req.request.method).toEqual('POST');
  });

  it('deletePantryItem makes a DELETE request to /api/pantry', () => {

    pantryService.deleteItem(testPantryItems[0]._id).subscribe(
      (res) => expect(res).toBeTruthy()
    );

    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(pantryService.pantryUrl)
    );
    expect(req.request.method).toEqual('DELETE');
  });

});
