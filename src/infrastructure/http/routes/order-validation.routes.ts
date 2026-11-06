import { Router, type Response } from 'express';
import type {
  IValidateOrderInput,
  ValidateOrderUseCase,
} from '../../../application/validation/validate-order.use-case';
import { DomainError, type IOrder } from '../../../domain/shared';

const NOT_FOUND_CODES = new Set(['CART_NOT_FOUND', 'BRAND_NOT_FOUND']);

/** Story 3 - POST /orders : valide un panier et crée la commande. */
export function createOrderValidationRouter(validateOrder: ValidateOrderUseCase): Router {
  const router = Router();

  router.post('/', (req, res) => {
    const input = parseBody(req.body);
    if (!input) {
      res.status(400).json({
        error: 'INVALID_REQUEST',
        message: 'cartId et deliveryAddress sont obligatoires',
      });
      return;
    }

    try {
      res.status(201).json(toOrderResponse(validateOrder.execute(input)));
    } catch (error) {
      if (!(error instanceof DomainError)) {
        throw error;
      }
      sendDomainError(res, error);
    }
  });

  return router;
}

function parseBody(body: unknown): IValidateOrderInput | undefined {
  if (typeof body !== 'object' || body === null) {
    return undefined;
  }
  const { cartId, deliveryAddress, pricing, promoCode } = body as Record<string, unknown>;
  if (!isFilledString(cartId) || !isFilledString(deliveryAddress)) {
    return undefined;
  }
  if (!isOptionalString(pricing) || !isOptionalString(promoCode)) {
    return undefined;
  }
  return { cartId, deliveryAddress, pricing, promoCode };
}

function isFilledString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === 'string';
}

function sendDomainError(res: Response, error: DomainError): void {
  const status = NOT_FOUND_CODES.has(error.code) ? 404 : 422;
  res.status(status).json({ error: error.code, message: error.message });
}

/** `status` est un getter de `Order` : il n'apparaîtrait pas avec un simple `res.json(order)`. */
function toOrderResponse(order: IOrder) {
  return {
    id: order.id,
    customerId: order.customerId,
    brandId: order.brandId,
    items: order.items,
    total: order.total,
    deliveryAddress: order.deliveryAddress,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
  };
}
