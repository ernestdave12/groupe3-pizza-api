import { DomainError, type IPromoCode, type IPromoCodeRepository } from '../../domain/shared';

/** Codes promo stockés en mémoire, indexés par code. */
export class InMemoryPromoCodeRepository implements IPromoCodeRepository {
  private readonly promoCodes = new Map<string, IPromoCode>();

  add(promoCode: IPromoCode): void {
    if (this.promoCodes.has(promoCode.code)) {
      throw new DomainError('PROMO_CODE_ALREADY_EXISTS', `Le code ${promoCode.code} existe déjà`);
    }
    this.promoCodes.set(promoCode.code, promoCode);
  }

  findByCode(code: string): IPromoCode | undefined {
    return this.promoCodes.get(code);
  }

  findByCustomer(customerId: string): readonly IPromoCode[] {
    return [...this.promoCodes.values()].filter((promoCode) => promoCode.customerId === customerId);
  }

  markAsUsed(code: string, at: Date): void {
    const promoCode = this.promoCodes.get(code);
    if (!promoCode) {
      throw new DomainError('PROMO_CODE_NOT_FOUND', `Le code ${code} n'existe pas`);
    }
    if (promoCode.usedAt) {
      throw new DomainError('PROMO_CODE_ALREADY_USED', `Le code ${code} a déjà servi`);
    }
    this.promoCodes.set(code, { ...promoCode, usedAt: at });
  }
}
