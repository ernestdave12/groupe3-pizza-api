import { OrderStatus } from '../enums/order-status.enum';
import type { ICartItem } from '../interfaces/cart-item.interface';
import type { IOrderProps } from '../interfaces/order-props.interface';
import type { IOrder } from '../interfaces/order.interface';

/** Commande créée à partir d'un panier validé. */
export class Order implements IOrder {
  readonly id: string;
  readonly customerId: string;
  readonly brandId: string;
  readonly items: readonly ICartItem[];
  readonly total: number;
  readonly deliveryAddress: string;
  readonly createdAt: Date;
  private currentStatus: OrderStatus;

  constructor(props: IOrderProps) {
    this.id = props.id;
    this.customerId = props.customerId;
    this.brandId = props.brandId;
    this.items = [...props.items];
    this.total = props.total;
    this.deliveryAddress = props.deliveryAddress;
    this.createdAt = props.createdAt;
    this.currentStatus = props.status ?? OrderStatus.Pending;
  }

  get status(): OrderStatus {
    return this.currentStatus;
  }

  changeStatus(next: OrderStatus): OrderStatus {
    const previous = this.currentStatus;
    this.currentStatus = next;
    return previous;
  }
}
