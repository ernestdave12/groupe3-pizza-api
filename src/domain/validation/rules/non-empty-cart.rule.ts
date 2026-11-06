import { AbstractValidationRule, type RuleFailure } from '../abstract-validation-rule';
import type { IOrderValidationContext } from '../interfaces/order-validation-context.interface';

export class NonEmptyCartRule extends AbstractValidationRule {
  readonly name = 'non-empty-cart';

  protected check({ cart }: IOrderValidationContext): RuleFailure | undefined {
    if (cart.isEmpty()) {
      return { code: 'EMPTY_CART', message: 'Le panier est vide' };
    }
    return undefined;
  }
}
