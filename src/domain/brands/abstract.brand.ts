import {IBrand, IPizza, Size} from "../shared";


/**
 * US1 - Classe de base commune aux trois enseignes.
 */
export abstract class AbstractBrand implements IBrand {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly menu: readonly IPizza[];

  /** Recherche une pizza dans le menu de l'enseigne. */
  findPizza(pizzaId: string): IPizza | undefined {
    return this.menu.find((pizza) => pizza.id === pizzaId);
  }

  /** Vérifie si l'enseigne propose au moins une pizza de cette taille. */
  isSizeAvailable(size: Size): boolean {
    return this.menu.some((pizza) => pizza.availableSizes.includes(size));
  }

  /** Calcule le prix selon la règle propre à chaque enseigne. */
  abstract priceForSize(basePrice: number, size: Size): number;

  /** Indique si l'enseigne est ouverte à la date donnée. */
  isOpen(_at: Date): boolean {
    return true;
  }
}
