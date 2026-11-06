import type { Ingredient } from '../enums/ingredient.enum';
import type { PizzaBase } from '../enums/pizza-base.enum';

/** Composition d'une pizza personnalisée (Story 8). */
export interface ICustomPizzaDetails {
  readonly base: PizzaBase;
  readonly ingredients: readonly Ingredient[];
}
