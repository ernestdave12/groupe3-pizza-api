import type { IBrand } from '../../shared/interfaces/brand.interface';
import type { ICart } from '../../shared/interfaces/cart.interface';

/**
 * Ce que les règles de validation ont besoin de connaître (Story 3).
 * La commande n'existe pas encore à ce stade : on valide le panier avant de la créer.
 */
export interface IOrderValidationContext {
  readonly cart: ICart;
  readonly brand: IBrand;
  readonly deliveryAddress: string;
  /** Total à payer en euros, réduction comprise. */
  readonly amount: number;
  /** Moment de la commande (pour les horaires d'ouverture). */
  readonly at: Date;
}
