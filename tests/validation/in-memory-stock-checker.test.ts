import { describe, expect, it } from 'vitest';
import { Ingredient, PizzaBase, type ICartItem } from '../../src/domain/shared';
import { InMemoryStockChecker } from '../../src/infrastructure/validation/in-memory-stock-checker';
import { margherita } from './fixtures';

const stock = new InMemoryStockChecker({ 'fake-brand': { margherita: 1 } });

describe('InMemoryStockChecker', () => {
  it('accepte un panier couvert par le stock', () => {
    expect(stock.findUnavailableItems('fake-brand', [margherita])).toEqual([]);
  });

  it('signale les pizzas au-delà de la quantité disponible', () => {
    const second = { ...margherita, id: 'item-2' };

    expect(stock.findUnavailableItems('fake-brand', [margherita, second])).toEqual([second]);
  });

  it('considère une pizza absente du stock comme épuisée', () => {
    const calzone = { ...margherita, id: 'item-3', pizzaId: 'calzone', name: 'Calzone' };

    expect(stock.findUnavailableItems('fake-brand', [calzone])).toEqual([calzone]);
  });

  it('laisse passer les pizzas personnalisées', () => {
    const custom: ICartItem = {
      ...margherita,
      id: 'item-4',
      pizzaId: undefined,
      customPizza: { base: PizzaBase.Tomato, ingredients: [Ingredient.Ham] },
    };

    expect(stock.findUnavailableItems('fake-brand', [custom])).toEqual([]);
  });
});
