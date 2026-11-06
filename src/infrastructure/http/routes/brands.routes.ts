import { Router } from 'express';
import {
  getBrandPizzas,
  listBrands,
} from '../../../application/brands/brand-catalog.service';

export const brandsRouter = Router();

/** US1 - Liste les enseignes. */
brandsRouter.get('/', (_req, res) => {
  res.json(listBrands());
});

/** US1 - Retourne les pizzas d'une enseigne. */
brandsRouter.get('/:brandId/pizzas', (req, res) => {
  const pizzas = getBrandPizzas(req.params.brandId);

  if (!pizzas) {
    res.status(404).json({
      error: 'BRAND_NOT_FOUND',
      message: `Enseigne introuvable : ${req.params.brandId}`,
    });
    return;
  }

  res.json(pizzas);
});
