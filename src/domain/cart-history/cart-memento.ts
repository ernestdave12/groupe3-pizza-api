import { DomainError } from '../shared/errors/domain-error';
import type { ICartItem } from '../shared/interfaces/cart-item.interface';
import { copyCartItems } from './copy-cart-items';

// Instantané privé. Seul le panier possédant la clé peut en obtenir une copie.
export class CartMemento {
  readonly #items: readonly ICartItem[];
  readonly #owner: object;

  constructor(items: readonly ICartItem[], owner: object) {
    this.#owner = owner;
    this.#items = copyCartItems(items);
    Object.freeze(this);
  }

  restore(owner: object): ICartItem[] {
    if (owner !== this.#owner) {
      throw new DomainError(
        'INVALID_CART_MEMENTO',
        'Cette sauvegarde appartient à un autre panier',
      );
    }
    return copyCartItems(this.#items);
  }
}
