import type { ICartItem } from '../../domain/shared';
import type { IStockChecker } from '../../domain/validation';

type StockByPizza = Readonly<Record<string, number>>;

/**
 * Stock en mémoire : quantité disponible par enseigne et par pizza du menu (Story 3).
 * Une pizza absente du stock compte pour 0. Les pizzas personnalisées sont toujours disponibles.
 */
export class InMemoryStockChecker implements IStockChecker {
  constructor(private readonly stockByBrand: Readonly<Record<string, StockByPizza>>) {}

  findUnavailableItems(brandId: string, items: readonly ICartItem[]): readonly ICartItem[] {
    const stock = this.stockByBrand[brandId] ?? {};
    const used = new Map<string, number>();

    return items.filter((item) => {
      if (item.pizzaId === undefined) {
        return false;
      }
      const alreadyUsed = used.get(item.pizzaId) ?? 0;
      if (alreadyUsed >= (stock[item.pizzaId] ?? 0)) {
        return true;
      }
      used.set(item.pizzaId, alreadyUsed + 1);
      return false;
    });
  }
}
