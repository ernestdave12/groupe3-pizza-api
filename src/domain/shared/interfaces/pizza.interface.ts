import type { Size } from '../enums/size.enum';

/** Pizza du menu d'une enseigne. */
export interface IPizza {
  readonly id: string;
  readonly name: string;
  /** Prix de référence (taille M), en euros. */
  readonly basePrice: number;
  /** Tailles proposées (ex. Pizzium : uniquement M). */
  readonly availableSizes: readonly Size[];
}
