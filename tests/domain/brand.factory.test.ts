import { describe, it, expect } from 'vitest';

import { BrandFactory } from '../../src/domain/factories/brand.factory';
import '../../src/domain/brands/register-brands';

describe('BrandFactory', () => {
  it('should create Da Michele', () => {
    const brand = BrandFactory.create('da-michele');

    expect(brand.name).toBe('Da Michele');
  });

  it('should create Rossopomodoro', () => {
    const brand = BrandFactory.create('rossopomodoro');

    expect(brand.name).toBe('Rossopomodoro');
  });

  it('should create Pizzium', () => {
    const brand = BrandFactory.create('pizzium');

    expect(brand.name).toBe('Pizzium');
  });

  it('should throw an error for an unknown brand', () => {
    expect(() => BrandFactory.create('unknown')).toThrow(
      'Unknown brand: unknown',
    );
  });

  it('should return all registered brands', () => {
    expect(BrandFactory.getAvailableBrands()).toEqual([
      'da-michele',
      'rossopomodoro',
      'pizzium',
    ]);
  });
});
