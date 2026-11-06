/** Client de la marketplace. */
export interface ICustomer {
  readonly id: string;
  readonly name: string;
  readonly deliveryAddress: string;
  /** Client fidèle : donne droit à la réduction fidélité (Story 2). */
  readonly isLoyal: boolean;
}
