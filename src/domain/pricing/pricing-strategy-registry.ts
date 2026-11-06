import { DomainError } from '../shared/errors/domain-error';
import type { IPricingStrategy } from './interfaces/pricing-strategy.interface';

/**
 * Retrouve une stratégie à partir de son id (ex. `?pricing=happy-hour`).
 * Ajouter une stratégie = la passer au constructeur, sans modifier cette classe.
 */
export class PricingStrategyRegistry {
  private readonly strategies = new Map<string, IPricingStrategy>();

  constructor(strategies: readonly IPricingStrategy[]) {
    for (const strategy of strategies) {
      this.strategies.set(strategy.id, strategy);
    }
  }

  get(id: string): IPricingStrategy {
    const strategy = this.strategies.get(id);
    if (!strategy) {
      throw new DomainError('UNKNOWN_PRICING_STRATEGY', `Stratégie de prix inconnue : ${id}`);
    }
    return strategy;
  }
}
