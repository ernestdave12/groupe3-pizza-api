import {AbstractBrand} from "./abstract.brand";
import {IPizza, Size} from "../shared";

/**
 * US1 - Enseigne Pizzium avec son propre menu et ses règles de prix.
 */
export class PizziumBrand extends AbstractBrand {
  readonly id = 'pizzium';
  readonly name = 'Pizzium';

  readonly menu: readonly IPizza[] = [
    {
      id: 'margherita',
      name: 'Margherita',
      basePrice: 11,
      availableSizes: [Size.M],
    },
    {
      id: 'diavola',
      name: 'Diavola',
      basePrice: 13,
      availableSizes: [Size.M],
    },
  ];

  priceForSize(basePrice: number, size: Size): number {
    if (size !== Size.M) {
      throw new Error(`Only size M is available at ${this.name}`);
    }

    return basePrice;
  }
}
