import type { Size } from '../enums/size.enum';
import { DomainError } from '../errors/domain-error';
import type { ICartItem } from '../interfaces/cart-item.interface';
import type { ICart } from '../interfaces/cart.interface';
import { roundMoney } from '../utils/money';

/** Panier d'un client pour une enseigne. */
export class Cart implements ICart {
  private items: ICartItem[] = [];

  constructor(
    readonly id: string,
    readonly customerId: string,
    readonly brandId: string,
  ) {}

  getItems(): readonly ICartItem[] {
    return [...this.items];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  addItem(item: ICartItem): void {
    this.items.push(item);
  }

  removeItem(itemId: string): void {
    this.findIndexOrFail(itemId);
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  changeSize(itemId: string, size: Size, unitPrice: number): void {
    const index = this.findIndexOrFail(itemId);
    const current = this.items[index] as ICartItem;
    this.items[index] = { ...current, size, unitPrice };
  }

  getSubtotal(): number {
    return roundMoney(this.items.reduce((sum, item) => sum + item.unitPrice, 0));
  }

  private findIndexOrFail(itemId: string): number {
    const index = this.items.findIndex((item) => item.id === itemId);
    if (index === -1) {
      throw new DomainError('CART_ITEM_NOT_FOUND', `Aucune ligne ${itemId} dans le panier`);
    }
    return index;
  }
}
