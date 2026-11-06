import { Size, type IBrand, type IPizza } from '../../src/domain/shared';

/** Enseigne factice pour tester sans dépendre des vraies enseignes (Story 1). */
export class FakeBrand implements IBrand {
  readonly id = 'fake-brand';
  readonly name = 'Fake Brand';

  constructor(
    private readonly open = true,
    readonly menu: readonly IPizza[] = [
      {
        id: 'margherita',
        name: 'Margherita',
        basePrice: 10,
        availableSizes: [Size.S, Size.M, Size.L, Size.XL],
      },
    ],
  ) {}

  findPizza(pizzaId: string): IPizza | undefined {
    return this.menu.find((pizza) => pizza.id === pizzaId);
  }

  priceForSize(basePrice: number, _size: Size): number {
    return basePrice;
  }

  isSizeAvailable(_size: Size): boolean {
    return true;
  }

  isOpen(_at: Date): boolean {
    return this.open;
  }
}
