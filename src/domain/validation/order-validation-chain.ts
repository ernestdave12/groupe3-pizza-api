import type { IDeliveryZoneChecker } from './interfaces/delivery-zone-checker.interface';
import type { IStockChecker } from './interfaces/stock-checker.interface';
import type { IValidationRule } from './interfaces/validation-rule.interface';
import { BrandOpenRule } from './rules/brand-open.rule';
import { DeliveryZoneRule } from './rules/delivery-zone.rule';
import { MinimumAmountRule } from './rules/minimum-amount.rule';
import { NonEmptyCartRule } from './rules/non-empty-cart.rule';
import { StockAvailableRule } from './rules/stock-available.rule';
import { ValidationChainBuilder } from './validation-chain.builder';

export interface IOrderValidationDependencies {
  readonly deliveryZones: IDeliveryZoneChecker;
  readonly stock: IStockChecker;
}

/**
 * Chaîne utilisée à la création d'une commande.
 * Les vérifications les moins coûteuses passent en premier, le stock en dernier.
 */
export function createOrderValidationChain(deps: IOrderValidationDependencies): IValidationRule {
  return new ValidationChainBuilder()
    .add(new NonEmptyCartRule())
    .add(new MinimumAmountRule())
    .add(new DeliveryZoneRule(deps.deliveryZones))
    .add(new BrandOpenRule())
    .add(new StockAvailableRule(deps.stock))
    .build();
}
