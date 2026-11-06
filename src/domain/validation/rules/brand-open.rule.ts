import { AbstractValidationRule, type RuleFailure } from '../abstract-validation-rule';
import type { IOrderValidationContext } from '../interfaces/order-validation-context.interface';

/** Les horaires sont gérés par chaque enseigne via `IBrand.isOpen`. */
export class BrandOpenRule extends AbstractValidationRule {
  readonly name = 'brand-open';

  protected check({ brand, at }: IOrderValidationContext): RuleFailure | undefined {
    if (!brand.isOpen(at)) {
      return { code: 'BRAND_CLOSED', message: `${brand.name} est fermé pour le moment` };
    }
    return undefined;
  }
}
