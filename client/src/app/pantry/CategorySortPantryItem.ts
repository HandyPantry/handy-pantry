import { PantryDisplayItem } from './pantryDisplayItem';

export interface CategorySortPantryItem {
  category: string;
  count: number;
  pantryItems: PantryDisplayItem[];
}
