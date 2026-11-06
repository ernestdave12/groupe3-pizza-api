import {BrandFactory} from "../../domain/factories/brand.factory";
import '../../domain/brands/register-brands';

/** US1 - Retourne la liste des enseignes disponibles. */
export function listBrands() {
  return BrandFactory.getAvailableBrands().map((id) => {
    const brand = BrandFactory.create(id);

    return {
      id: brand.id,
      name: brand.name,
      isOpen: brand.isOpen(new Date()),
    };
  });
}

/** US1 - Retourne le menu et les prix d'une enseigne. */
export function getBrandPizzas(brandId: string) {
  if (!BrandFactory.getAvailableBrands().includes(brandId)) {
    return undefined;
  }

  const brand = BrandFactory.create(brandId);

  return brand.menu.map((pizza) => ({
    id: pizza.id,
    name: pizza.name,
    basePrice: pizza.basePrice,
    sizes: pizza.availableSizes,
    prices: pizza.availableSizes.map((size) => ({
      size,
      price: brand.priceForSize(pizza.basePrice, size),
    })),
  }));
}
