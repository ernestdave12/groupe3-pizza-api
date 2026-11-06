import type { OrderStatus } from '../enums/order-status.enum';
import type { ICartItem } from './cart-item.interface';

/** Données nécessaires pour créer une commande. */
export interface IOrderProps {
  readonly id: string;
  readonly customerId: string;
  readonly brandId: string;
  readonly items: readonly ICartItem[];
  /** Total à payer en euros, réduction comprise. */
  readonly total: number;
  readonly deliveryAddress: string;
  readonly createdAt: Date;
  /** `pending` par défaut. */
  readonly status?: OrderStatus;
}
