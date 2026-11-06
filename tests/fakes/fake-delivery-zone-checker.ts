import type { IDeliveryZoneChecker } from '../../src/domain/validation';

/** Zone de livraison factice : accepte ou refuse toutes les adresses (Story 3). */
export class FakeDeliveryZoneChecker implements IDeliveryZoneChecker {
  calls = 0;

  constructor(private readonly deliverable = true) {}

  isDeliverable(): boolean {
    this.calls++;
    return this.deliverable;
  }
}
