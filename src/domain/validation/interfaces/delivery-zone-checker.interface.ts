/** Indique si une enseigne livre à une adresse donnée (Story 3). */
export interface IDeliveryZoneChecker {
  isDeliverable(brandId: string, deliveryAddress: string): boolean;
}
