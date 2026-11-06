import { DomainError } from '../shared/errors/domain-error';
import type { IValidationError } from './interfaces/validation-result.interface';

/** Commande refusée par une règle de la chaîne : traduite en 422 par la couche HTTP. */
export class OrderValidationError extends DomainError {
  readonly rule: string;

  constructor(error: IValidationError) {
    super(error.code, error.message);
    this.name = 'OrderValidationError';
    this.rule = error.rule;
  }
}
