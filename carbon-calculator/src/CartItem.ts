/**
 * Represents a carbon offset item in the cart.
 * vars:
 *  title: a description of the item, e.g., "Plane Trip"
 *  cost: the amount of the item in dollars
 *  carbon: the amount of carbon offset in lbs
 */
export class CartItem {
  title?: string = "";
  cost?: number = 0;
  carbon?: number = 0;

  constructor() {}
}
