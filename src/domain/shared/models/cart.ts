import { CartHistory, CartMemento, copyCartItems } from '../../cart-history';
import  { Size } from '../enums/size.enum';
import { DomainError } from '../errors/domain-error';
import type { ICartItem } from '../interfaces/cart-item.interface';
import type { ICart } from '../interfaces/cart.interface';
import { roundMoney } from '../utils/money';

/** Panier d'un client pour une enseigne. */
export class Cart implements ICart {
  private items: ICartItem[] = [];
  readonly snapshotOwner = {};
  readonly history = new CartHistory({
    save: () => new CartMemento(this.items, this.snapshotOwner),
    restore: (snapshot) => {
      this.items = snapshot.restore(this.snapshotOwner);
    },
  });

  constructor(
    readonly id: string,
    readonly customerId: string,
    readonly brandId: string,
  ) {}

  getItems(): readonly ICartItem[] {
    return copyCartItems(this.items);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  addItem(item: ICartItem): void {
    this.validateSizeAndPrice(item.size, item.unitPrice);
    if (this.items.some((current) => current.id === item.id)) {
      throw new DomainError('CART_ITEM_ALREADY_EXISTS', `La ligne ${item.id} existe déjà`);
    }
    this.replaceItems([...this.items, ...copyCartItems([item])]);
  }

  removeItem(itemId: string): void {
    this.findIndexOrFail(itemId);
    this.replaceItems(this.items.filter((item) => item.id !== itemId));
  }

  changeSize(itemId: string, size: Size, unitPrice: number): void {
    const index = this.findIndexOrFail(itemId);
    const current = this.items[index] as ICartItem;
    this.validateSizeAndPrice(size, unitPrice);
    if (current.size === size && current.unitPrice === unitPrice) return;
    const next = [...this.items];
    next[index] = { ...current, size, unitPrice };
    this.replaceItems(next);
  }

  get canUndo(): boolean {
    return this.history.canUndo;
  }

  get canRedo(): boolean {
    return this.history.canRedo;
  }

  undo(): boolean {
    return this.history.undo();
  }

  redo(): boolean {
    return this.history.redo();
  }

  private replaceItems(next: ICartItem[]): void {
    const previous = new CartMemento(this.items, this.snapshotOwner);
    this.items = next;
    this.history.record(previous);
  }

  private validateSizeAndPrice(size: Size, unitPrice: number): void {
    if (!Object.values(Size).includes(size) || !Number.isFinite(unitPrice) || unitPrice < 0) {
      throw new DomainError('INVALID_CART_ITEM', 'La taille ou le prix de la ligne est invalide');
    }
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
