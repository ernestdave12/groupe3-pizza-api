import { Ingredient } from '../enums/ingredient.enum';

/** Prix de la base d'une pizza personnalisée, en euros (Story 8). */
export const CUSTOM_PIZZA_BASE_PRICE = 5;

/**
 * Catalogue des ingrédients et de leur prix, en euros (Story 8).
 * `Record<Ingredient, number>` oblige à donner un prix à CHAQUE ingrédient de l'enum :
 * ajouter un ingrédient à l'enum sans prix provoque une erreur de compilation.
 */
export const INGREDIENT_PRICES: Readonly<Record<Ingredient, number>> = {
  [Ingredient.Mozzarella]: 1.5,
  [Ingredient.Pepperoni]: 2,
  [Ingredient.Mushrooms]: 1,
  [Ingredient.Ham]: 2,
  [Ingredient.Olives]: 1,
  [Ingredient.Gorgonzola]: 2.5,
};
