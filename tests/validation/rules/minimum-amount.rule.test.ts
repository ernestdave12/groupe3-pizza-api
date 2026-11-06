import { describe, expect, it } from 'vitest';
import { MINIMUM_ORDER_AMOUNT } from '../../../src/domain/shared';
import { MinimumAmountRule } from '../../../src/domain/validation';
import { makeContext } from '../fixtures';

describe('MinimumAmountRule', () => {
  it('accepte une commande de 15€ pile', () => {
    const result = new MinimumAmountRule().validate(makeContext({ amount: MINIMUM_ORDER_AMOUNT }));

    expect(result.valid).toBe(true);
  });

  it('refuse une commande sous 15€', () => {
    const result = new MinimumAmountRule().validate(makeContext({ amount: 14.99 }));

    expect(result).toEqual({
      valid: false,
      error: {
        rule: 'minimum-amount',
        code: 'MINIMUM_AMOUNT_NOT_REACHED',
        message: 'Le montant minimum de commande est de 15€',
      },
    });
  });

  it('accepte un autre minimum passé au constructeur', () => {
    expect(new MinimumAmountRule(25).validate(makeContext({ amount: 20 })).valid).toBe(false);
  });
});
