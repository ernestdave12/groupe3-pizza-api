import { describe, expect, it } from 'vitest';
import { BrandOpenRule } from '../../../src/domain/validation';
import { FakeBrand } from '../../fakes/fake-brand';
import { makeContext } from '../fixtures';

describe('BrandOpenRule', () => {
  it('accepte une commande quand l’enseigne est ouverte', () => {
    const result = new BrandOpenRule().validate(makeContext({ brand: new FakeBrand(true) }));

    expect(result.valid).toBe(true);
  });

  it('refuse une commande quand l’enseigne est fermée', () => {
    const result = new BrandOpenRule().validate(makeContext({ brand: new FakeBrand(false) }));

    expect(result).toEqual({
      valid: false,
      error: {
        rule: 'brand-open',
        code: 'BRAND_CLOSED',
        message: 'Fake Brand est fermé pour le moment',
      },
    });
  });
});
