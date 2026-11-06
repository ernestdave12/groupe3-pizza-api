import type { ICustomer } from '../../shared/interfaces/customer.interface';
import type { IPromoCode } from '../../shared/interfaces/promo-code.interface';

/**
 * Données nécessaires au calcul du prix (Story 2).
 * Regroupées dans un seul objet pour que toutes les stratégies aient la même signature :
 * chacune lit seulement ce dont elle a besoin.
 */
export interface IPricingContext {
  /** Somme des prix unitaires du panier, avant réduction (`ICart.getSubtotal()`). */
  readonly subtotal: number;
  /** Client qui commande (ex. `isLoyal` pour la fidélité). */
  readonly customer: ICustomer;
  /** Moment du calcul (ex. pour vérifier la plage Happy Hour). */
  readonly at: Date;
  /** Code promo saisi par le client, absent s'il n'en a pas. */
  readonly promoCode?: IPromoCode;
}
