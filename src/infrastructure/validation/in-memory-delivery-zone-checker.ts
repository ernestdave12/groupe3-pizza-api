import type { IDeliveryZoneChecker } from '../../domain/validation';

const POSTAL_CODE = /\b\d{5}\b/g;

/**
 * Zones de livraison en mémoire : codes postaux desservis par enseigne (Story 3).
 * Une adresse est acceptée si elle contient l'un de ces codes.
 */
export class InMemoryDeliveryZoneChecker implements IDeliveryZoneChecker {
  private readonly zones: ReadonlyMap<string, ReadonlySet<string>>;

  constructor(postalCodesByBrand: Readonly<Record<string, readonly string[]>>) {
    this.zones = new Map(
      Object.entries(postalCodesByBrand).map(([brandId, codes]) => [brandId, new Set(codes)]),
    );
  }

  isDeliverable(brandId: string, deliveryAddress: string): boolean {
    const covered = this.zones.get(brandId);
    if (!covered) {
      return false;
    }
    return (deliveryAddress.match(POSTAL_CODE) ?? []).some((code) => covered.has(code));
  }
}
