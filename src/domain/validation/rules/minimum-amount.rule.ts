import { MINIMUM_ORDER_AMOUNT } from '../../shared/constants/order.constants';
import { AbstractValidationRule, type RuleFailure } from '../abstract-validation-rule';
import type { IOrderValidationContext } from '../interfaces/order-validation-context.interface';

/** Le minimum porte sur le total après réduction. */
export class MinimumAmountRule extends AbstractValidationRule {
  readonly name = 'minimum-amount';

  constructor(private readonly minimum: number = MINIMUM_ORDER_AMOUNT) {
    super();
  }

  protected check({ amount }: IOrderValidationContext): RuleFailure | undefined {
    if (amount < this.minimum) {
      return {
        code: 'MINIMUM_AMOUNT_NOT_REACHED',
        message: `Le montant minimum de commande est de ${this.minimum}€`,
      };
    }
    return undefined;
  }
}
