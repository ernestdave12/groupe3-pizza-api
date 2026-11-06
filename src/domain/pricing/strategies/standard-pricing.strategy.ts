import { roundMoney } from '../../shared/utils/money';
import type { IPricingContext } from '../interfaces/pricing-context.interface';
import type { IPricingStrategy } from '../interfaces/pricing-strategy.interface';

/** Prix normal, sans réduction. */
export class StandardPricingStrategy implements IPricingStrategy {
  readonly id = 'standard';

  calculate(context: IPricingContext): number {
    return roundMoney(context.subtotal);
  }
}
