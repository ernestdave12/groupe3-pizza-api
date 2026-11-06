import type { OrderStatus } from '../enums/order-status.enum';
import type { ICartItem } from './cart-item.interface';

/** Commande créée à partir d'un panier validé. */
export interface IOrder {
  readonly id: string;
  readonly customerId: string;
  readonly brandId: string;
  readonly items: readonly ICartItem[];
  readonly total: number;
  readonly deliveryAddress: string;
  readonly createdAt: Date;
  readonly status: OrderStatus;

  /** Change le statut et renvoie l'ancien (utile pour les notifications, Story 5). */
  changeStatus(next: OrderStatus): OrderStatus;
}
