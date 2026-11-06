import { DomainError } from '../../shared/errors/domain-error';
import { roundMoney } from '../../shared/utils/money';
import type { IPricingContext } from '../interfaces/pricing-context.interface';
import type { IPricingStrategy } from '../interfaces/pricing-strategy.interface';

/**
 * Applique la réduction du code promo saisi par le client.
 * Le code n'est pas marqué comme utilisé ici : c'est fait à la création de la commande.
 */
export class PromoCodePricingStrategy implements IPricingStrategy {
  readonly id = 'promo-code';

  calculate(context: IPricingContext): number {
    const { promoCode, customer } = context;

    if (!promoCode) {
      throw new DomainError('PROMO_CODE_MISSING', 'Aucun code promo saisi');
    }
    if (promoCode.customerId !== customer.id) {
      throw new DomainError(
        'PROMO_CODE_NOT_ALLOWED',
        `Le code ${promoCode.code} appartient à un autre client`,
      );
    }
    if (promoCode.usedAt) {
      throw new DomainError('PROMO_CODE_ALREADY_USED', `Le code ${promoCode.code} a déjà servi`);
    }

    return roundMoney(context.subtotal * (1 - promoCode.discountPercent / 100));
  }
}
