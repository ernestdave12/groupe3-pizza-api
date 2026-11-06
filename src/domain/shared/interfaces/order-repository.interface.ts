import type { IOrderFilter } from './order-filter.interface';
import type { IOrder } from './order.interface';

/** Stockage des commandes (pattern Repository). */
export interface IOrderRepository {
  save(order: IOrder): void;
  findById(orderId: string): IOrder | undefined;
  /**
   * Commandes d'un client, filtrées si besoin (Story 9).
   * Le tri par date est fait par le cas d'usage d'historique, pas par le stockage.
   */
  findByCustomer(customerId: string, filter?: IOrderFilter): readonly IOrder[];
}
