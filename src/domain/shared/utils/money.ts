/** Arrondit un montant en euros au centime (évite les 10.799999999 dus aux flottants). */
export function roundMoney(amount: number): number {
  return Math.round(amount * 100) / 100;
}
