import { DomainError } from '../shared/errors/domain-error';
import type { IValidationRule } from './interfaces/validation-rule.interface';

/** Relie les règles dans l'ordre où elles sont ajoutées et renvoie la première. */
export class ValidationChainBuilder {
  private readonly rules: IValidationRule[] = [];

  add(rule: IValidationRule): this {
    this.rules.push(rule);
    return this;
  }

  build(): IValidationRule {
    const [first, ...others] = this.rules;
    if (!first) {
      throw new DomainError(
        'EMPTY_VALIDATION_CHAIN',
        'La chaîne de validation ne contient aucune règle',
      );
    }
    others.reduce((previous, rule) => previous.setNext(rule), first);
    return first;
  }
}
