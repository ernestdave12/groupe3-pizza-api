import type { IOrderValidationContext } from './order-validation-context.interface';
import type { ValidationResult } from './validation-result.interface';

/**
 * Maillon de la chaîne de validation (Story 3, pattern Chain of Responsibility).
 * Chaque règle refuse la commande ou passe la main à la suivante.
 */
export interface IValidationRule {
  readonly name: string;

  /** Branche la règle suivante et la renvoie, pour pouvoir enchaîner les appels. */
  setNext(rule: IValidationRule): IValidationRule;

  validate(context: IOrderValidationContext): ValidationResult;
}
