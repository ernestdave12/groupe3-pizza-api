import type { IOrderValidationContext } from './interfaces/order-validation-context.interface';
import type { IValidationError, ValidationResult } from './interfaces/validation-result.interface';
import type { IValidationRule } from './interfaces/validation-rule.interface';

export type RuleFailure = Omit<IValidationError, 'rule'>;

/**
 * Gère l'enchaînement : une règle concrète n'implémente que `check`.
 * Dès qu'une règle échoue, les suivantes ne sont pas appelées.
 */
export abstract class AbstractValidationRule implements IValidationRule {
  abstract readonly name: string;
  private next?: IValidationRule;

  setNext(rule: IValidationRule): IValidationRule {
    this.next = rule;
    return rule;
  }

  validate(context: IOrderValidationContext): ValidationResult {
    const failure = this.check(context);
    if (failure) {
      return { valid: false, error: { rule: this.name, ...failure } };
    }
    return this.next ? this.next.validate(context) : { valid: true };
  }

  /** Renvoie la raison du refus, ou `undefined` si la règle est respectée. */
  protected abstract check(context: IOrderValidationContext): RuleFailure | undefined;
}
