import type { ICartItem } from '../../src/domain/shared';
import type { IStockChecker } from '../../src/domain/validation';

/** Stock factice : les pizzas listées sont en rupture, les autres disponibles (Story 3). */
export class FakeStockChecker implements IStockChecker {
  calls = 0;

  constructor(private readonly outOfStockPizzaIds: readonly string[] = []) {}

  findUnavailableItems(_brandId: string, items: readonly ICartItem[]): readonly ICartItem[] {
    this.calls++;
    return items.filter(
      (item) => item.pizzaId !== undefined && this.outOfStockPizzaIds.includes(item.pizzaId),
    );
  }
}
