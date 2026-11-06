import {AbstractBrand} from "./abstract.brand";
import {IPizza, Size} from "../shared";

/**
 * US1 - Enseigne Da Michele avec son propre menu et ses règles de prix.
 */
export class DaMicheleBrand extends AbstractBrand {
  readonly id = 'da-michele';
  readonly name = 'Da Michele';

  readonly menu: readonly IPizza[] = [
    {
      id: 'margherita',
      name: 'Margherita',
      basePrice: 10,
      availableSizes: [Size.S, Size.M, Size.L],
    },
    {
      id: 'marinara',
      name: 'Marinara',
      basePrice: 9,
      availableSizes: [Size.M, Size.L],
    },
  ];

  priceForSize(basePrice: number, size: Size): number {
    switch (size) {
      case Size.S:
        return basePrice - 2;
      case Size.M:
        return basePrice;
      case Size.L:
        return basePrice + 3;
      default:
        throw new Error(`Size not supported by ${this.name}: ${size}`);
    }
  }
}
