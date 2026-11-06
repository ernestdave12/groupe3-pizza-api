import { describe, expect, it, vi } from 'vitest';
import { DomainError } from '../../src/domain/shared';
import {
  createOrderValidationChain,
  NonEmptyCartRule,
  ValidationChainBuilder,
  type IValidationRule,
} from '../../src/domain/validation';
import { FakeBrand } from '../fakes/fake-brand';
import { FakeDeliveryZoneChecker } from '../fakes/fake-delivery-zone-checker';
import { FakeStockChecker } from '../fakes/fake-stock-checker';
import { cartWith, makeContext } from './fixtures';

function setup(options: { deliverable?: boolean; outOfStock?: string[] } = {}) {
  const deliveryZones = new FakeDeliveryZoneChecker(options.deliverable ?? true);
  const stock = new FakeStockChecker(options.outOfStock ?? []);
  return { deliveryZones, stock, chain: createOrderValidationChain({ deliveryZones, stock }) };
}

describe('createOrderValidationChain', () => {
  it('accepte une commande qui respecte toutes les règles', () => {
    const { chain, deliveryZones, stock } = setup();

    expect(chain.validate(makeContext())).toEqual({ valid: true });
    expect(deliveryZones.calls).toBe(1);
    expect(stock.calls).toBe(1);
  });

  it("s'arrête à la première erreur : panier vide, aucune autre règle appelée", () => {
    const { chain, deliveryZones, stock } = setup({
      deliverable: false,
      outOfStock: ['margherita'],
    });
    const brand = new FakeBrand(false);
    const isOpen = vi.spyOn(brand, 'isOpen');

    const result = chain.validate(makeContext({ cart: cartWith(), amount: 0, brand }));

    expect(result.valid === false && result.error.code).toBe('EMPTY_CART');
    expect(deliveryZones.calls).toBe(0);
    expect(isOpen).not.toHaveBeenCalled();
    expect(stock.calls).toBe(0);
  });

  it("s'arrête sur la zone de livraison sans vérifier l'ouverture ni le stock", () => {
    const { chain, stock } = setup({ deliverable: false });
    const brand = new FakeBrand(false);
    const isOpen = vi.spyOn(brand, 'isOpen');

    const result = chain.validate(makeContext({ brand }));

    expect(result.valid === false && result.error.code).toBe('DELIVERY_ZONE_NOT_COVERED');
    expect(isOpen).not.toHaveBeenCalled();
    expect(stock.calls).toBe(0);
  });

  it("vérifie les règles dans l'ordre prévu", () => {
    const { chain } = setup({ deliverable: false, outOfStock: ['margherita'] });

    const result = chain.validate(makeContext({ amount: 10, brand: new FakeBrand(false) }));

    expect(result.valid === false && result.error.rule).toBe('minimum-amount');
  });
});

describe('ValidationChainBuilder', () => {
  it('relie les règles dans leur ordre d’ajout', () => {
    const calls: string[] = [];
    const spyRule = (name: string): IValidationRule => {
      const rule = new NonEmptyCartRule();
      const validate = rule.validate.bind(rule);
      vi.spyOn(rule, 'validate').mockImplementation((context) => {
        calls.push(name);
        return validate(context);
      });
      return rule;
    };

    new ValidationChainBuilder()
      .add(spyRule('a'))
      .add(spyRule('b'))
      .add(spyRule('c'))
      .build()
      .validate(makeContext());

    expect(calls).toEqual(['a', 'b', 'c']);
  });

  it('refuse de construire une chaîne vide', () => {
    expect(() => new ValidationChainBuilder().build()).toThrow(DomainError);
  });
});
