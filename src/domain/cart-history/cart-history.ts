import type { CartMemento } from './cart-memento';

interface CartOriginator {
  save(): CartMemento;
  restore(snapshot: CartMemento): void;
}

// Caretaker : manipule des sauvegardes opaques, sans accéder aux lignes.
export class CartHistory {
  readonly #undo: CartMemento[] = [];
  readonly #redo: CartMemento[] = [];

  constructor(private readonly cart: CartOriginator) {}

  get canUndo(): boolean {
    return this.#undo.length > 0;
  }

  get canRedo(): boolean {
    return this.#redo.length > 0;
  }

  // Appelé uniquement après une modification effective et réussie.
  record(previous: CartMemento): void {
    this.pushUndo(previous);
    this.#redo.length = 0;
  }

  undo(): boolean {
    const previous = this.#undo.at(-1);
    if (!previous) return false;
    const current = this.cart.save();
    this.cart.restore(previous);
    this.#undo.pop();
    this.#redo.push(current);
    return true;
  }

  redo(): boolean {
    const next = this.#redo.at(-1);
    if (!next) return false;
    const current = this.cart.save();
    this.cart.restore(next);
    this.#redo.pop();
    this.pushUndo(current);
    return true;
  }

  private pushUndo(snapshot: CartMemento): void {
    this.#undo.push(snapshot);
    if (this.#undo.length > 10) this.#undo.shift();
  }
}
