import { describe, expect, it } from 'vitest';
import { NonEmptyCartRule } from '../../../src/domain/validation';
import { cartWith, makeContext } from '../fixtures';

describe('NonEmptyCartRule', () => {
  it('accepte un panier avec au moins une pizza', () => {
    expect(new NonEmptyCartRule().validate(makeContext())).toEqual({ valid: true });
  });

  it('refuse un panier vide', () => {
    const result = new NonEmptyCartRule().validate(makeContext({ cart: cartWith() }));

    expect(result).toEqual({
      valid: false,
      error: { rule: 'non-empty-cart', code: 'EMPTY_CART', message: 'Le panier est vide' },
    });
  });
});
