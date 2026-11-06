import { BrandFactory } from '../factories/brand.factory';
import { DaMicheleBrand } from './da-michele.brand';
import { RossopomodoroBrand } from './rossopomodoro.brand';
import { PizziumBrand } from './pizzium.brand';

/**
 * US1 - Enregistre les trois enseignes dans la Factory.
 * Une nouvelle enseigne nécessite une nouvelle classe et un enregistrement ici.
 */
BrandFactory.register('da-michele', () => new DaMicheleBrand());
BrandFactory.register('rossopomodoro', () => new RossopomodoroBrand());
BrandFactory.register('pizzium', () => new PizziumBrand());
