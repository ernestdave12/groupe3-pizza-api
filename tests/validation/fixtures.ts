import { Cart, Size, type ICartItem } from '../../src/domain/shared';
import type { IOrderValidationContext } from '../../src/domain/validation';
import { FakeBrand } from '../fakes/fake-brand';

export const margherita: ICartItem = {
  id: 'item-1',
  pizzaId: 'margherita',
  name: 'Margherita',
  size: Size.M,
  unitPrice: 10,
};

export function cartWith(...items: ICartItem[]): Cart {
  const cart = new Cart('cart-1', 'customer-1', 'fake-brand');
  items.forEach((item) => cart.addItem(item));
  return cart;
}

/** Contexte valide par défaut : chaque test ne change que ce qu'il vérifie. */
export function makeContext(
  overrides: Partial<IOrderValidationContext> = {},
): IOrderValidationContext {
  return {
    cart: cartWith(margherita, { ...margherita, id: 'item-2' }),
    brand: new FakeBrand(),
    deliveryAddress: '1 rue de Paris 75001 Paris',
    amount: 20,
    at: new Date('2026-11-06T19:00:00Z'),
    ...overrides,
  };
}
