import type { IPromoCode } from './promo-code.interface';

/**
 * Stockage des codes promo (Story 2).
 * L'implémentation utilise une Map indexée par `code` : un même code ne peut exister qu'une fois.
 */
export interface IPromoCodeRepository {
  /** Enregistre un nouveau code. Doit refuser un code déjà existant. */
  add(promoCode: IPromoCode): void;
  findByCode(code: string): IPromoCode | undefined;
  findByCustomer(customerId: string): readonly IPromoCode[];
  /** Marque le code comme utilisé. Doit refuser un code déjà utilisé. */
  markAsUsed(code: string, at: Date): void;
}
