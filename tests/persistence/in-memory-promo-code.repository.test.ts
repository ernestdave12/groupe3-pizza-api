import { describe, expect, it } from 'vitest';
import { DomainError, type IPromoCode } from '../../src/domain/shared';
import { InMemoryPromoCodeRepository } from '../../src/infrastructure/persistence/in-memory-promo-code.repository';

const promoCode: IPromoCode = { code: 'PIZZA-15', customerId: 'customer-1', discountPercent: 15 };

describe('InMemoryPromoCodeRepository', () => {
  it('retrouve un code par sa valeur et par client', () => {
    const repository = new InMemoryPromoCodeRepository();
    repository.add(promoCode);

    expect(repository.findByCode('PIZZA-15')).toEqual(promoCode);
    expect(repository.findByCustomer('customer-1')).toHaveLength(1);
    expect(repository.findByCustomer('customer-2')).toHaveLength(0);
  });

  it('refuse un code qui existe déjà', () => {
    const repository = new InMemoryPromoCodeRepository();
    repository.add(promoCode);

    expect(() => repository.add(promoCode)).toThrow(DomainError);
  });

  it('marque un code comme utilisé, une seule fois', () => {
    const repository = new InMemoryPromoCodeRepository();
    repository.add(promoCode);
    const usedAt = new Date(2026, 10, 6, 12, 0);

    repository.markAsUsed('PIZZA-15', usedAt);

    expect(repository.findByCode('PIZZA-15')?.usedAt).toEqual(usedAt);
    expect(() => repository.markAsUsed('PIZZA-15', usedAt)).toThrow(DomainError);
  });

  it('refuse de marquer un code inexistant', () => {
    expect(() => new InMemoryPromoCodeRepository().markAsUsed('INCONNU', new Date())).toThrow(
      DomainError,
    );
  });
});
