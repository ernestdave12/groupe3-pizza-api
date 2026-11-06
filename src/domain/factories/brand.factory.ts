import {DomainError, IBrand} from "../shared";

type BrandConstructor = () => IBrand;

/**
 * US1 - Factory : création extensible des enseignes.
 */
export class BrandFactory {
  private static readonly registry = new Map<string, BrandConstructor>();

  /** Enregistre le constructeur d'une nouvelle enseigne. */
  static register(id: string, constructor: BrandConstructor): void {
    if (this.registry.has(id)) {
      throw new DomainError('BRAND_ALREADY_REGISTERED', `Brand already registered: ${id}`);
    }

    this.registry.set(id, constructor);
  }

  /** Crée une enseigne à partir de son identifiant. */
  static create(id: string): IBrand {
    const constructor = this.registry.get(id);

    if (!constructor) {
      throw new DomainError('BRAND_NOT_FOUND', `Unknown brand: ${id}`);
    }

    return constructor();
  }

  /** Retourne les identifiants des enseignes disponibles. */
  static getAvailableBrands(): string[] {
    return [...this.registry.keys()];
  }
}
