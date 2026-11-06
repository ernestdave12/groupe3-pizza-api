import { describe, expect, it } from 'vitest';
import {
  Cart,
  DomainError,
  Ingredient,
  PizzaBase,
  Size,
  type ICartItem,
} from '../../src/domain/shared';

const margherita: ICartItem = {
  id: 'item-1',
  pizzaId: 'margherita',
  name: 'Margherita',
  size: Size.M,
  unitPrice: 9,
};
const customPizza: ICartItem = {
  id: 'item-2',
  name: 'Pizza perso',
  customPizza: { base: PizzaBase.Cream, ingredients: [Ingredient.Mozzarella, Ingredient.Olives] },
  size: Size.M,
  unitPrice: 7.5,
};

function emptyCart(): Cart {
  return new Cart('cart-1', 'customer-1', 'da-michele');
}

describe('Cart', () => {
  it('est vide à la création', () => {
    const cart = emptyCart();

    expect(cart.isEmpty()).toBe(true);
    expect(cart.getSubtotal()).toBe(0);
  });

  it('accepte une pizza du menu et une pizza personnalisée', () => {
    const cart = emptyCart();
    cart.addItem(margherita);
    cart.addItem(customPizza);

    expect(cart.getItems()).toHaveLength(2);
    expect(cart.getSubtotal()).toBe(16.5);
  });

  it('retire une ligne', () => {
    const cart = emptyCart();
    cart.addItem(margherita);
    cart.removeItem('item-1');

    expect(cart.isEmpty()).toBe(true);
  });

  it("change la taille et le prix d'une ligne", () => {
    const cart = emptyCart();
    cart.addItem(margherita);
    cart.changeSize('item-1', Size.L, 12);

    expect(cart.getItems()[0]).toMatchObject({ size: Size.L, unitPrice: 12 });
  });

  it('refuse de modifier une ligne inexistante', () => {
    expect(() => emptyCart().removeItem('inconnu')).toThrow(DomainError);
  });

  it("ne permet pas de modifier les lignes depuis l'extérieur", () => {
    const cart = emptyCart();
    cart.addItem(margherita);

    (cart.getItems() as ICartItem[]).pop();

    expect(cart.getItems()).toHaveLength(1);
  });
});
