import { describe, expect, it } from 'vitest';
import { StockAvailableRule } from '../../../src/domain/validation';
import { FakeStockChecker } from '../../fakes/fake-stock-checker';
import { makeContext } from '../fixtures';

describe('StockAvailableRule', () => {
  it('accepte une commande quand tout est en stock', () => {
    const rule = new StockAvailableRule(new FakeStockChecker());

    expect(rule.validate(makeContext()).valid).toBe(true);
  });

  it('refuse une commande avec une pizza en rupture, citée une seule fois', () => {
    const rule = new StockAvailableRule(new FakeStockChecker(['margherita']));

    const result = rule.validate(makeContext());

    expect(result).toEqual({
      valid: false,
      error: {
        rule: 'stock-available',
        code: 'OUT_OF_STOCK',
        message: 'Plus de stock pour : Margherita',
      },
    });
  });
});
