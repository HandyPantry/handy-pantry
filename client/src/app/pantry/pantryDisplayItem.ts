import { Product } from '../products/product';

export interface PantryDisplayItem {
  _id: string;
  product: Product;
   // eslint-disable-next-line @typescript-eslint/naming-convention
   purchase_date: Date;
   notes?: string;
}
