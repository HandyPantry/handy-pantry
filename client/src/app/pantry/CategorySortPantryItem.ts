import { ProductCategory } from '../products/product';
import { PantryDisplayItem } from './pantryDisplayItem';

export interface CategorySortPantryItem {
  category: ProductCategory;
  count: number;
  pantryItems: PantryDisplayItem[];
}
