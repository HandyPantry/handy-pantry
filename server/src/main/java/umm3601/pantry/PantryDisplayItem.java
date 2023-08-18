package umm3601.pantry;

import org.mongojack.Id;
import org.mongojack.ObjectId;

import umm3601.product.Product;

@SuppressWarnings({ "VisibilityModifier", "MemberName" })
public class PantryDisplayItem {
  @ObjectId
  @Id
  public String _id;
  public Product product;
  public String purchase_date;
  public String notes;
}
