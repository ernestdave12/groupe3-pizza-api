import { describe, expect, it } from 'vitest';
import { DeliveryZoneRule } from '../../../src/domain/validation';
import { FakeDeliveryZoneChecker } from '../../fakes/fake-delivery-zone-checker';
import { makeContext } from '../fixtures';

describe('DeliveryZoneRule', () => {
  it('accepte une adresse dans la zone', () => {
    const rule = new DeliveryZoneRule(new FakeDeliveryZoneChecker(true));

    expect(rule.validate(makeContext()).valid).toBe(true);
  });

  it('refuse une adresse hors zone', () => {
    const rule = new DeliveryZoneRule(new FakeDeliveryZoneChecker(false));

    const result = rule.validate(makeContext({ deliveryAddress: '1 place Bellecour 69002 Lyon' }));

    expect(result).toEqual({
      valid: false,
      error: {
        rule: 'delivery-zone',
        code: 'DELIVERY_ZONE_NOT_COVERED',
        message: "Fake Brand ne livre pas à l'adresse : 1 place Bellecour 69002 Lyon",
      },
    });
  });
});
