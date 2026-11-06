import type { Size } from '../enums/size.enum';
import type { IPizza } from './pizza.interface';

/**
 * Contrat d'une enseigne (Story 1).
 * Chaque enseigne (Da Michele, Rossopomodoro, Pizzium…) est une classe qui implémente cette interface.
 */
export interface IBrand {
  readonly id: string;
  readonly name: string;
  /** Menu de l'enseigne (lecture seule : on ne peut pas le modifier de l'extérieur). */
  readonly menu: readonly IPizza[];

  /** Retrouve une pizza du menu, ou `undefined` si elle n'existe pas. */
  findPizza(pizzaId: string): IPizza | undefined;

  /**
   * Applique la règle de taille propre à l'enseigne à un prix de base (taille M).
   * Utilisée pour les pizzas du menu ET pour les pizzas personnalisées (Story 8).
   * Ex. Da Michele : S = -2 €, L = +3 € ; Rossopomodoro : S = ×0.8, L = ×1.3.
   */
  priceForSize(basePrice: number, size: Size): number;

  /** Indique si l'enseigne propose cette taille. */
  isSizeAvailable(size: Size): boolean;

  /** Indique si l'enseigne est ouverte à ce moment-là (Story 3). */
  isOpen(at: Date): boolean;
}
