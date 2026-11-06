/** Code promo unique, attribué à un client et utilisable une seule fois (Story 2). */
export interface IPromoCode {
  /** Le code lui-même, unique dans toute la marketplace (ex. "PIZZA-7F3K2"). */
  readonly code: string;
  /** Seul ce client peut l'utiliser. */
  readonly customerId: string;
  /** Réduction en pourcentage (ex. 15 pour -15 %). */
  readonly discountPercent: number;
  /** Date d'utilisation, absente tant que le code n'a pas servi. */
  readonly usedAt?: Date;
}
