import type { ICartItem } from '../../shared/interfaces/cart-item.interface';

/** Vérifie le stock d'une enseigne (Story 3). */
export interface IStockChecker {
  /** Renvoie les lignes du panier qui ne peuvent pas être servies (liste vide si tout est dispo). */
  findUnavailableItems(brandId: string, items: readonly ICartItem[]): readonly ICartItem[];
}
