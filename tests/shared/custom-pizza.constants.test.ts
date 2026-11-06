import { describe, expect, it } from 'vitest';
import { INGREDIENT_PRICES, Ingredient } from '../../src/domain/shared';

describe('INGREDIENT_PRICES', () => {
  it('donne un prix à chaque ingrédient', () => {
    for (const ingredient of Object.values(Ingredient)) {
      expect(INGREDIENT_PRICES[ingredient]).toBeGreaterThan(0);
    }
  });
});
