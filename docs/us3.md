# Story 3 — Validation de commande

> Notes de la story 3. Les blocs « à recopier » seront reportés dans `docs/patterns.md`
> et `docs/openapi.yaml` au moment de la PR.

## Pattern : Chain of Responsibility

Chaque règle est une classe qui refuse la commande ou passe la main à la suivante.
La première règle en échec arrête la chaîne : les suivantes ne sont pas appelées.

Pourquoi ce pattern :

- une règle = une classe, testable seule ;
- ajouter une règle = écrire une classe et l'ajouter au builder, sans toucher aux autres ;
- l'ordre des règles est défini à un seul endroit (`createOrderValidationChain`).

Alternative écartée : une méthode `validate()` avec une suite de `if`. Plus courte au début,
mais chaque nouvelle règle modifie la même méthode et on ne peut pas tester une règle isolément.

## Règles, dans l'ordre

| #   | Classe               | Code d'erreur                | Vérifie                                      |
| --- | -------------------- | ---------------------------- | -------------------------------------------- |
| 1   | `NonEmptyCartRule`   | `EMPTY_CART`                 | le panier contient au moins une pizza        |
| 2   | `MinimumAmountRule`  | `MINIMUM_AMOUNT_NOT_REACHED` | total ≥ `MINIMUM_ORDER_AMOUNT` (15 €)        |
| 3   | `DeliveryZoneRule`   | `DELIVERY_ZONE_NOT_COVERED`  | l'enseigne livre à l'adresse                 |
| 4   | `BrandOpenRule`      | `BRAND_CLOSED`               | `IBrand.isOpen(at)`                          |
| 5   | `StockAvailableRule` | `OUT_OF_STOCK`               | toutes les pizzas du panier sont disponibles |

Les vérifications simples passent d'abord, le stock en dernier.

## Fichiers

- `src/domain/validation/` : interfaces, classe de base `AbstractValidationRule`, les 5 règles,
  `ValidationChainBuilder`, `createOrderValidationChain`, `OrderValidationError`
- `src/application/validation/` : `ValidateOrderUseCase` et ses ports (`ICartFinder`,
  `IBrandFinder`, `IOrderTotalCalculator`)
- `src/infrastructure/http/routes/order-validation.routes.ts` : `POST /orders`
- `src/infrastructure/validation/` : zone de livraison (codes postaux par enseigne) et stock
  (quantité par enseigne et par pizza) en mémoire
- `tests/validation/` : une suite par règle, la chaîne, la route, les versions en mémoire

## Reste à faire

La route n'est pas encore branchée dans `app.ts` : elle a besoin du stockage des paniers, de la
recherche d'enseigne (story 1), des stratégies de prix (story 2) et du stockage des commandes
(story 9). Une fois ces stories mergées dans `dev`, il suffira d'assembler la route et d'ajouter
dans `app.ts` :

```ts
app.use('/orders', orderValidationRouter);
```

## Décisions

- **Montant minimum = total après réduction** : c'est ce que le client paie. Le total est
  calculé par `IOrderTotalCalculator` (stratégies de la story 2) avant la validation.
- Les règles renvoient un résultat typé (`{ valid: true }` ou `{ valid: false, error }`) au lieu
  de lever une exception. Le cas d'usage transforme un refus en `OrderValidationError`
  (une `DomainError`), que la route traduit en 422.
- Zone de livraison et stock passent par deux interfaces injectées (`IDeliveryZoneChecker`,
  `IStockChecker`) : aucune donnée en dur dans les règles.
- Les horaires d'ouverture restent dans chaque enseigne (`IBrand.isOpen`, story 1).
- Une commande acceptée est créée avec le statut `validated` et enregistrée dans
  `IOrderRepository`.
- Réponses de la route : 201 commande créée, 400 corps invalide, 404 panier ou enseigne
  inconnus, 422 commande refusée (`{ error, message }`).

## À recopier dans `docs/patterns.md`

Ligne du tableau :

```md
| 3. Validation | Règles chaînées, première erreur = stop | Chain of Responsibility | `src/domain/validation/` | ✅ |
```

Section « Justifications » :

```md
### Chain of Responsibility — Story 3

**Problème :** une commande doit passer plusieurs règles (panier non vide, minimum 15 €, zone,
enseigne ouverte, stock) et être refusée dès la première erreur.
**Solution :** une classe par règle, reliées entre elles ; chaque règle refuse ou passe à la suivante.
`AbstractValidationRule` gère l'enchaînement, `ValidationChainBuilder` fixe l'ordre.
**Pourquoi ce pattern :** ajouter une règle ne modifie pas les règles existantes, et chaque règle
se teste seule.
**Alternative écartée :** une méthode unique avec une suite de `if`, à modifier à chaque nouvelle règle.
**Fichiers :** `src/domain/validation/`
```

## À recopier dans `docs/openapi.yaml`

Remplace le bloc `/orders` › `post` existant (à indenter de 2 espaces sous `paths:`) :

```yaml
/orders:
  post:
    tags: [Orders]
    summary: Valider un panier et créer la commande
    description: |
      Règles chaînées, dans l'ordre : panier non vide, minimum 15€ (après réduction),
      zone de livraison, enseigne ouverte, stock. Première erreur = stop.
      Codes possibles en 422 : EMPTY_CART, MINIMUM_AMOUNT_NOT_REACHED,
      DELIVERY_ZONE_NOT_COVERED, BRAND_CLOSED, OUT_OF_STOCK.
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [cartId, deliveryAddress]
            properties:
              cartId: { type: string }
              deliveryAddress: { type: string }
              pricing: { $ref: '#/components/schemas/PricingStrategy' }
              promoCode: { type: string }
    responses:
      '201':
        description: Commande créée avec le statut `validated`
        content:
          application/json:
            schema: { $ref: '#/components/schemas/Order' }
      '400':
        description: Corps de requête invalide (INVALID_REQUEST)
        content:
          application/json:
            schema: { $ref: '#/components/schemas/Error' }
      '404': { $ref: '#/components/responses/NotFound' }
      '422': { $ref: '#/components/responses/ValidationError' }
```

La route renvoie aussi `deliveryAddress` dans la commande : à ajouter au schéma `Order` si
on veut l'exposer dans le contrat :

```yaml
deliveryAddress: { type: string }
```
