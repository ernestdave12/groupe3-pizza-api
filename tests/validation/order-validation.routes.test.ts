import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import type { IOrderTotalRequest } from '../../src/application/validation/validate-order.ports';
import { ValidateOrderUseCase } from '../../src/application/validation/validate-order.use-case';
import { OrderStatus, type ICart } from '../../src/domain/shared';
import { createOrderValidationChain } from '../../src/domain/validation';
import { createOrderValidationRouter } from '../../src/infrastructure/http/routes/order-validation.routes';
import { FakeBrand } from '../fakes/fake-brand';
import { FakeDeliveryZoneChecker } from '../fakes/fake-delivery-zone-checker';
import { FakeStockChecker } from '../fakes/fake-stock-checker';
import { InMemoryOrderRepository } from '../fakes/in-memory-order-repository';
import { cartWith, margherita } from './fixtures';

function setup(options: { cart?: ICart; brandOpen?: boolean; deliverable?: boolean } = {}) {
  const cart = options.cart ?? cartWith(margherita, { ...margherita, id: 'item-2' });
  const brand = new FakeBrand(options.brandOpen ?? true);
  const orders = new InMemoryOrderRepository();
  const totalRequests: IOrderTotalRequest[] = [];

  const useCase = new ValidateOrderUseCase({
    carts: { findById: (id) => (id === cart.id ? cart : undefined) },
    brands: { findById: (id) => (id === brand.id ? brand : undefined) },
    totals: {
      calculate: (totalRequest) => {
        totalRequests.push(totalRequest);
        return totalRequest.cart.getSubtotal();
      },
    },
    orders,
    validation: createOrderValidationChain({
      deliveryZones: new FakeDeliveryZoneChecker(options.deliverable ?? true),
      stock: new FakeStockChecker(),
    }),
    now: () => new Date('2026-11-06T19:00:00Z'),
    generateId: () => 'order-1',
  });

  const app = express();
  app.use(express.json());
  app.use('/orders', createOrderValidationRouter(useCase));
  return { app, cart, orders, totalRequests };
}

const body = { cartId: 'cart-1', deliveryAddress: '1 rue de Paris 75001 Paris' };

describe('POST /orders', () => {
  it('crée une commande validée quand toutes les règles passent', async () => {
    const { app, orders } = setup();

    const res = await request(app).post('/orders').send(body);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 'order-1',
      customerId: 'customer-1',
      brandId: 'fake-brand',
      total: 20,
      status: OrderStatus.Validated,
      createdAt: '2026-11-06T19:00:00.000Z',
    });
    expect(res.body.items).toHaveLength(2);
    expect(orders.findById('order-1')).toBeDefined();
  });

  it('transmet la stratégie de prix et le code promo au calcul du total', async () => {
    const { app, totalRequests } = setup();

    await request(app)
      .post('/orders')
      .send({ ...body, pricing: 'promo-code', promoCode: 'PIZZA-7F3K2' });

    expect(totalRequests[0]).toMatchObject({ pricing: 'promo-code', promoCode: 'PIZZA-7F3K2' });
  });

  it('répond 422 avec la première règle en échec, sans créer de commande', async () => {
    const { app, orders } = setup({ cart: cartWith(margherita), brandOpen: false });

    const res = await request(app).post('/orders').send(body);

    expect(res.status).toBe(422);
    expect(res.body).toEqual({
      error: 'MINIMUM_AMOUNT_NOT_REACHED',
      message: 'Le montant minimum de commande est de 15€',
    });
    expect(orders.findByCustomer('customer-1')).toHaveLength(0);
  });

  it('répond 422 quand l’enseigne ne livre pas à cette adresse', async () => {
    const { app } = setup({ deliverable: false });

    const res = await request(app).post('/orders').send(body);

    expect(res.status).toBe(422);
    expect(res.body.error).toBe('DELIVERY_ZONE_NOT_COVERED');
  });

  it('répond 404 si le panier est inconnu', async () => {
    const { app } = setup();

    const res = await request(app)
      .post('/orders')
      .send({ ...body, cartId: 'inconnu' });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('CART_NOT_FOUND');
  });

  it("répond 400 s'il manque l'adresse de livraison", async () => {
    const { app } = setup();

    const res = await request(app).post('/orders').send({ cartId: 'cart-1' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('INVALID_REQUEST');
  });
});
