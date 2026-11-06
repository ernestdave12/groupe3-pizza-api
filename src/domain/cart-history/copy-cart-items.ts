import type { ICartItem } from '../shared/interfaces/cart-item.interface';

/** Les lignes actuelles sont des données : seules composition et ingrédients sont imbriqués. */
export function copyCartItems(items: readonly ICartItem[]): ICartItem[] {
  return items.map((item) => ({
    ...item,
    ...(item.customPizza ? { customPizza: { ...item.customPizza, ingredients: [...item.customPizza.ingredients] } }
      : {}),
  }));
}
