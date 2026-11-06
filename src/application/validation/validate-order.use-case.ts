import { randomUUID } from 'node:crypto';
import {
  DomainError,
  Order,
  OrderStatus,
  type IOrder,
  type IOrderRepository,
} from '../../domain/shared';
import { OrderValidationError, type IValidationRule } from '../../domain/validation';
import type { IBrandFinder, ICartFinder, IOrderTotalCalculator } from './validate-order.ports';

export interface IValidateOrderInput {
  readonly cartId: string;
  readonly deliveryAddress: string;
  readonly pricing?: string;
  readonly promoCode?: string;
}

export interface IValidateOrderDependencies {
  readonly carts: ICartFinder;
  readonly brands: IBrandFinder;
  readonly totals: IOrderTotalCalculator;
  readonly orders: IOrderRepository;
  readonly validation: IValidationRule;
  readonly now?: () => Date;
  readonly generateId?: () => string;
}

/** Valide un panier et crée la commande correspondante (Story 3). */
export class ValidateOrderUseCase {
  private readonly now: () => Date;
  private readonly generateId: () => string;

  constructor(private readonly deps: IValidateOrderDependencies) {
    this.now = deps.now ?? (() => new Date());
    this.generateId = deps.generateId ?? randomUUID;
  }

  execute(input: IValidateOrderInput): IOrder {
    const cart = this.deps.carts.findById(input.cartId);
    if (!cart) {
      throw new DomainError('CART_NOT_FOUND', `Panier introuvable : ${input.cartId}`);
    }
    const brand = this.deps.brands.findById(cart.brandId);
    if (!brand) {
      throw new DomainError('BRAND_NOT_FOUND', `Enseigne introuvable : ${cart.brandId}`);
    }

    const at = this.now();
    const amount = this.deps.totals.calculate({
      cart,
      at,
      pricing: input.pricing,
      promoCode: input.promoCode,
    });

    const result = this.deps.validation.validate({
      cart,
      brand,
      deliveryAddress: input.deliveryAddress,
      amount,
      at,
    });
    if (!result.valid) {
      throw new OrderValidationError(result.error);
    }

    const order = new Order({
      id: this.generateId(),
      customerId: cart.customerId,
      brandId: brand.id,
      items: cart.getItems(),
      total: amount,
      deliveryAddress: input.deliveryAddress,
      createdAt: at,
      status: OrderStatus.Validated,
    });
    this.deps.orders.save(order);
    return order;
  }
}
