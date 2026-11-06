# Design patterns utilisés

> Critère n°1 de l'évaluation : **patterns utilisés et justifiés**.
> Chaque PR qui introduit un pattern complète sa ligne ci-dessous (où, pourquoi, alternative écartée).

| Story                  | Besoin                                                                                       | Pattern pressenti                          | Emplacement           | Statut |
| ---------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------- | ------ |
| 1. Enseignes et pizzas | Ajouter une enseigne = ajouter une classe ; chaque enseigne a son menu et ses règles de prix | Factory Method / Abstract Factory          |                       | ⬜     |
| 2. Calcul du prix      | Standard, Happy Hour, code promo, fidélité ; facile d'en ajouter                             | Strategy                                   | `src/domain/pricing/` | ✅     |
| 3. Validation          | Règles chaînées, première erreur = stop                                                      | Chain of Responsibility                    |                       | ⬜     |
| 4. Paiement            | 3 moyens aux signatures différentes, interchangeables dynamiquement                          | Adapter (+ Strategy)                       |                       | ⬜     |
| 5. Notifications       | Plusieurs listeners réagissent au changement de statut, activables dynamiquement             | Observer                                   |                       | ⬜     |
| 6. Undo / redo         | Sauvegarder/restaurer l'état du panier sans exposer ses détails (10 max)                     | **Memento** (à justifier, non vu en cours) |                       | ⬜     |
| 7. Tests               | 1 test par stratégie de prix                                                                 | —                                          | `tests/`              | ⬜     |
| 8. Pizza personnalisée | Base + taille + ingrédients à la carte                                                       | Builder / Decorator                        |                       | ⬜     |
| 9. Historique          | Liste triée et filtrée par statut                                                            | Repository                                 |                       | ⬜     |

## Justifications

### Strategy — Story 2

**Problème :** le total d'une commande se calcule de plusieurs façons (prix standard, Happy Hour -20 %, code promo, fidélité -10 %) et on doit pouvoir en ajouter facilement.

**Solution :** chaque calcul est une classe qui implémente `IPricingStrategy` (`calculate(context)`). Le code qui calcule le total reçoit une stratégie et l'appelle sans savoir laquelle c'est. `PricingStrategyRegistry` retrouve la stratégie demandée par l'API à partir de son id (`standard`, `happy-hour`, `promo-code`, `loyalty`).

**Pourquoi ce pattern :** une nouvelle réduction = une nouvelle classe, sans toucher aux stratégies existantes ni à `Cart` / `Order` (ouvert/fermé). Chaque stratégie se teste seule. Comme pour les comportements de vol de SimUDuck, on compose au lieu d'empiler des `if`.

**Alternative écartée :** un `switch` sur le type de réduction dans le panier ou la commande : il faudrait le modifier à chaque nouvelle réduction, et les règles seraient mélangées au reste.

**Choix :**

- Une seule réduction s'applique à la fois (pas de cumul).
- Si la condition n'est pas remplie (hors Happy Hour, client non fidèle, code promo absent, d'un autre client ou déjà utilisé), la stratégie lève une `DomainError` au lieu de revenir silencieusement au prix standard.
- La plage du Happy Hour (18h-20h) est commune à toutes les enseignes, dans `pricing.constants.ts`.
- Les stratégies ne font que calculer : marquer un code promo comme utilisé (`IPromoCodeRepository.markAsUsed`) se fait à la création de la commande.

**Fichiers :** `src/domain/pricing/`, `src/infrastructure/persistence/in-memory-promo-code.repository.ts`

<!-- Une section par pattern, à remplir au fil des PR. Modèle :

### Strategy — Story 2
**Problème :** …
**Solution :** …
**Pourquoi ce pattern :** …
**Alternative écartée :** …
**Fichiers :** `src/domain/pricing/...`
-->
