import type { IOrder, IOrderFilter, IOrderRepository } from '../../src/domain/shared';

/** Repository de commandes en mémoire pour les tests. */
export class InMemoryOrderRepository implements IOrderRepository {
  private readonly orders = new Map<string, IOrder>();

  save(order: IOrder): void {
    this.orders.set(order.id, order);
  }

  findById(orderId: string): IOrder | undefined {
    return this.orders.get(orderId);
  }

  findByCustomer(customerId: string, filter: IOrderFilter = {}): readonly IOrder[] {
    return [...this.orders.values()].filter(
      (order) =>
        order.customerId === customerId &&
        (filter.status === undefined || order.status === filter.status),
    );
  }
}
