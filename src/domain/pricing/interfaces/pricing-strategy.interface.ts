import type { IPricingContext } from './pricing-context.interface';

/**
 * Stratégie de calcul du prix (Story 2, pattern Strategy).
 * Ajouter une réduction = ajouter une classe qui implémente cette interface,
 * sans modifier les stratégies existantes (Standard, Happy Hour, Code promo, Fidélité…).
 */
export interface IPricingStrategy {
  /** Identifiant exposé par l'API (ex. 'standard', 'happy-hour', 'promo-code', 'loyalty'). */
  readonly id: string;

  /** Calcule le total à payer en euros, réduction comprise. */
  calculate(context: IPricingContext): number;
}
