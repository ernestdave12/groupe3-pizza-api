import { describe, expect, it } from 'vitest';
import { Order, OrderStatus } from '../../src/domain/shared';
import { InMemoryOrderRepository } from '../fakes/in-memory-order-repository';

function makeOrder(id: string, customerId = 'customer-1', status?: OrderStatus): Order {
  return new Order({
    id,
    customerId,
    brandId: 'da-michele',
    items: [],
    total: 20,
    deliveryAddress: '1 rue de Paris',
    createdAt: new Date('2026-11-06T12:00:00Z'),
    ...(status && { status }),
  });
}

describe('Order', () => {
  it('est en attente à la création', () => {
    expect(makeOrder('order-1').status).toBe(OrderStatus.Pending);
  });

  it("change de statut et renvoie l'ancien", () => {
    const order = makeOrder('order-1');

    const previous = order.changeStatus(OrderStatus.Paid);

    expect(previous).toBe(OrderStatus.Pending);
    expect(order.status).toBe(OrderStatus.Paid);
  });
});

describe('InMemoryOrderRepository', () => {
  it("retrouve les commandes d'un client", () => {
    const repository = new InMemoryOrderRepository();
    repository.save(makeOrder('order-1'));
    repository.save(makeOrder('order-2'));
    repository.save(makeOrder('order-3', 'customer-2'));

    expect(repository.findByCustomer('customer-1')).toHaveLength(2);
  });

  it('filtre par statut', () => {
    const repository = new InMemoryOrderRepository();
    repository.save(makeOrder('order-1', 'customer-1', OrderStatus.Delivered));
    repository.save(makeOrder('order-2', 'customer-1', OrderStatus.Cancelled));

    const delivered = repository.findByCustomer('customer-1', { status: OrderStatus.Delivered });

    expect(delivered.map((order) => order.id)).toEqual(['order-1']);
  });
});
