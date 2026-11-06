/** Statuts d'une commande, dans l'ordre du flow. */
export enum OrderStatus {
  Pending = 'pending',
  Validated = 'validated',
  Paid = 'paid',
  Preparing = 'preparing',
  Delivering = 'delivering',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}
