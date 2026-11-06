import type { Size } from '../enums/size.enum';
import type { ICustomPizzaDetails } from './custom-pizza-details.interface';

/** Ligne du panier : une pizza du menu OU une pizza personnalisée. */
export interface ICartItem {
  readonly id: string;
  /** Identifiant de la pizza du menu, absent pour une pizza personnalisée. */
  readonly pizzaId?: string;
  /** Composition, présente uniquement pour une pizza personnalisée. */
  readonly customPizza?: ICustomPizzaDetails;
  /** Libellé affiché (ex. "Margherita", "Pizza perso crème"). */
  readonly name: string;
  readonly size: Size;
  /** Prix unitaire en euros, taille comprise, avant réduction. */
  readonly unitPrice: number;
}
