import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockPantryService } from 'src/testing/pantry.service.mock';
import { PantryService } from '../pantry.service';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { PantryProductsListComponent } from './pantry-products-list.component';


const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatSnackBarModule,
  MatIconModule,
  BrowserAnimationsModule,
  RouterTestingModule,
  MatDialogModule
];

describe('PantryProductsListComponent', () => {
  let pantryProductsList: PantryProductsListComponent;
  let fixture: ComponentFixture<PantryProductsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [PantryProductsListComponent],
      providers: [{ provide: PantryService, useValue: new MockPantryService() },
        {provide: MAT_DIALOG_DATA, useValue: MockPantryService.testPantryItems[0]}]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(PantryProductsListComponent);
      pantryProductsList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(pantryProductsList).toBeTruthy();
  });

  it('should create a map of pantryItems grouped by category', () => {
    expect(pantryProductsList.groupedPantryItems.length).toEqual(3);
    expect(pantryProductsList.groupedPantryItems[0].count).toEqual(1);
  });

  it('creates a category map of comboItems', () => {
    expect(pantryProductsList.categoryNameMap.get('dairy').pantryItems[0].product._id).toBe('milk_id');
  });

});

