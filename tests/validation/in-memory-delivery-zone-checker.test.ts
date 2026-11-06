import { describe, expect, it } from 'vitest';
import { InMemoryDeliveryZoneChecker } from '../../src/infrastructure/validation/in-memory-delivery-zone-checker';

const zones = new InMemoryDeliveryZoneChecker({ 'da-michele': ['75001', '75002'] });

describe('InMemoryDeliveryZoneChecker', () => {
  it('accepte une adresse dont le code postal est desservi', () => {
    expect(zones.isDeliverable('da-michele', '1 rue de Rivoli 75001 Paris')).toBe(true);
  });

  it('refuse une adresse hors zone', () => {
    expect(zones.isDeliverable('da-michele', '1 place Bellecour 69002 Lyon')).toBe(false);
  });

  it('refuse une adresse sans code postal', () => {
    expect(zones.isDeliverable('da-michele', '1 rue de Rivoli, Paris')).toBe(false);
  });

  it('refuse une enseigne sans zone déclarée', () => {
    expect(zones.isDeliverable('pizzium', '1 rue de Rivoli 75001 Paris')).toBe(false);
  });
});
