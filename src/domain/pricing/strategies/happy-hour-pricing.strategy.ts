import { DomainError } from '../../shared/errors/domain-error';
import { roundMoney } from '../../shared/utils/money';
import {
  HAPPY_HOUR_DISCOUNT,
  HAPPY_HOUR_END_HOUR,
  HAPPY_HOUR_START_HOUR,
} from '../constants/pricing.constants';
import type { IPricingContext } from '../interfaces/pricing-context.interface';
import type { IPricingStrategy } from '../interfaces/pricing-strategy.interface';

/** -20 % pendant le Happy Hour. */
export class HappyHourPricingStrategy implements IPricingStrategy {
  readonly id = 'happy-hour';

  calculate(context: IPricingContext): number {
    if (!this.isHappyHour(context.at)) {
      throw new DomainError(
        'HAPPY_HOUR_NOT_ACTIVE',
        `Le Happy Hour est de ${HAPPY_HOUR_START_HOUR}h à ${HAPPY_HOUR_END_HOUR}h`,
      );
    }
    return roundMoney(context.subtotal * (1 - HAPPY_HOUR_DISCOUNT));
  }

  private isHappyHour(at: Date): boolean {
    const hour = at.getHours();
    return hour >= HAPPY_HOUR_START_HOUR && hour < HAPPY_HOUR_END_HOUR;
  }
}
