import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PantryDisplayItem } from '../../pantryDisplayItem';

import { DeletePantryItemComponent } from './delete-pantry-item.component';

describe('DeletePantryItemComponent', () => {
  let component: DeletePantryItemComponent;
  let fixture: ComponentFixture<DeletePantryItemComponent>;

  const testPantryDisplayItem: PantryDisplayItem = {
    _id: 'first_banana',
    product:  {
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    purchase_date: new Date('2022-03-30')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePantryItemComponent ],
      providers: [{provide: MAT_DIALOG_DATA, useValue: testPantryDisplayItem},
        {provide: MatDialogRef, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePantryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
