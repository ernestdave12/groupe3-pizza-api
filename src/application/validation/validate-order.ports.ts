import type { IBrand, ICart } from '../../domain/shared';

/*
 * Ce dont la validation a besoin et qui appartient à d'autres stories
 * (paniers, enseignes, calcul du prix). Branché au démarrage de l'application.
 */

export interface ICartFinder {
  findById(cartId: string): ICart | undefined;
}

export interface IBrandFinder {
  findById(brandId: string): IBrand | undefined;
}

export interface IOrderTotalRequest {
  readonly cart: ICart;
  readonly at: Date;
  /** Id de la stratégie de prix (ex. 'happy-hour'), 'standard' si absent. */
  readonly pricing?: string;
  readonly promoCode?: string;
}

/** Calcule le total à payer, réduction comprise (Story 2). */
export interface IOrderTotalCalculator {
  calculate(request: IOrderTotalRequest): number;
}
