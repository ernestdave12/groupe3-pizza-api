import {AbstractBrand} from "./abstract.brand";
import {IPizza, Size} from "../shared";

/**
 * US1 - Enseigne Rossopomodoro avec son propre menu et ses règles de prix.
 */
export class RossopomodoroBrand extends AbstractBrand {
  readonly id = 'rossopomodoro';
  readonly name = 'Rossopomodoro';

  readonly menu: readonly IPizza[] = [
    {
      id: 'margherita',
      name: 'Margherita',
      basePrice: 12,
      availableSizes: [Size.S, Size.M, Size.L],
    },
    {
      id: 'diavola',
      name: 'Diavola',
      basePrice: 14,
      availableSizes: [Size.M, Size.L],
    },
  ];

  priceForSize(basePrice: number, size: Size): number {
    switch (size) {
      case Size.S:
        return basePrice * 0.8;
      case Size.M:
        return basePrice;
      case Size.L:
        return basePrice * 1.3;
      default:
        throw new Error(`Size not supported by ${this.name}: ${size}`);
    }
  }
}
