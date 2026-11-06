import { DomainError } from '../../shared/errors/domain-error';
import { roundMoney } from '../../shared/utils/money';
import { LOYALTY_DISCOUNT } from '../constants/pricing.constants';
import type { IPricingContext } from '../interfaces/pricing-context.interface';
import type { IPricingStrategy } from '../interfaces/pricing-strategy.interface';

/** -10 % pour les clients fidèles. */
export class LoyaltyPricingStrategy implements IPricingStrategy {
  readonly id = 'loyalty';

  calculate(context: IPricingContext): number {
    if (!context.customer.isLoyal) {
      throw new DomainError(
        'CUSTOMER_NOT_LOYAL',
        "Ce client n'a pas droit à la réduction fidélité",
      );
    }
    return roundMoney(context.subtotal * (1 - LOYALTY_DISCOUNT));
  }
}
