import type { Size } from '../enums/size.enum';
import type { ICartItem } from './cart-item.interface';

/** Panier (basket) d'un client pour une enseigne. */
export interface ICart {
  readonly id: string;
  readonly customerId: string;
  readonly brandId: string;

  /** Copie des lignes : on ne peut pas modifier le panier de l'extérieur. */
  getItems(): readonly ICartItem[];
  isEmpty(): boolean;
  addItem(item: ICartItem): void;
  removeItem(itemId: string): void;
  /** Change la taille d'une ligne. Le nouveau prix est calculé par l'appelant via `IBrand.priceForSize`. */
  changeSize(itemId: string, size: Size, unitPrice: number): void;
  /** Somme des prix unitaires, avant réduction. */
  getSubtotal(): number;
}
