import { AbstractValidationRule, type RuleFailure } from '../abstract-validation-rule';
import type { IOrderValidationContext } from '../interfaces/order-validation-context.interface';
import type { IStockChecker } from '../interfaces/stock-checker.interface';

export class StockAvailableRule extends AbstractValidationRule {
  readonly name = 'stock-available';

  constructor(private readonly stock: IStockChecker) {
    super();
  }

  protected check({ brand, cart }: IOrderValidationContext): RuleFailure | undefined {
    const unavailable = this.stock.findUnavailableItems(brand.id, cart.getItems());
    if (unavailable.length > 0) {
      const names = [...new Set(unavailable.map((item) => item.name))].join(', ');
      return { code: 'OUT_OF_STOCK', message: `Plus de stock pour : ${names}` };
    }
    return undefined;
  }
}
