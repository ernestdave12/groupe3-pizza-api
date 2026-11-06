import { AbstractValidationRule, type RuleFailure } from '../abstract-validation-rule';
import type { IDeliveryZoneChecker } from '../interfaces/delivery-zone-checker.interface';
import type { IOrderValidationContext } from '../interfaces/order-validation-context.interface';

export class DeliveryZoneRule extends AbstractValidationRule {
  readonly name = 'delivery-zone';

  constructor(private readonly zones: IDeliveryZoneChecker) {
    super();
  }

  protected check({ brand, deliveryAddress }: IOrderValidationContext): RuleFailure | undefined {
    if (!this.zones.isDeliverable(brand.id, deliveryAddress)) {
      return {
        code: 'DELIVERY_ZONE_NOT_COVERED',
        message: `${brand.name} ne livre pas à l'adresse : ${deliveryAddress}`,
      };
    }
    return undefined;
  }
}
