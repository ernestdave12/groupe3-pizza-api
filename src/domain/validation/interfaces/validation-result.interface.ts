/** Raison du refus d'une commande. */
export interface IValidationError {
  /** Règle qui a refusé la commande (ex. 'minimum-amount'). */
  readonly rule: string;
  /** Code renvoyé par l'API (ex. 'MINIMUM_AMOUNT_NOT_REACHED'). */
  readonly code: string;
  readonly message: string;
}

export type ValidationResult =
  { readonly valid: true } | { readonly valid: false; readonly error: IValidationError };
