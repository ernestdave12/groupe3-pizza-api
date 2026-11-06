/**
 * Erreur métier. Le `code` permet à la couche HTTP de la traduire
 * en réponse JSON (404, 422…) sans connaître le détail du domaine.
 */
export class DomainError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'DomainError';
  }
}
