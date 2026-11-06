import type { OrderStatus } from '../enums/order-status.enum';

/** Critères de recherche des commandes (Story 9). */
export interface IOrderFilter {
  readonly status?: OrderStatus;
}
