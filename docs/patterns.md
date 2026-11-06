# Design patterns utilisés

> Critère n°1 de l'évaluation : **patterns utilisés et justifiés**.
> Chaque PR qui introduit un pattern complète sa ligne ci-dessous (où, pourquoi, alternative écartée).

| Story                  | Besoin                                                                                       | Pattern pressenti                          | Emplacement | Statut |
| ---------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------- | ------ |
| 1. Enseignes et pizzas | Ajouter une enseigne = ajouter une classe ; chaque enseigne a son menu et ses règles de prix | Factory Method / Abstract Factory          |             | ⬜     |
| 2. Calcul du prix      | Standard, Happy Hour, code promo, fidélité ; facile d'en ajouter                             | Strategy                                   |             | ⬜     |
| 3. Validation          | Règles chaînées, première erreur = stop                                                      | Chain of Responsibility                    |             | ⬜     |
| 4. Paiement            | 3 moyens aux signatures différentes, interchangeables dynamiquement                          | Adapter (+ Strategy)                       |             | ⬜     |
| 5. Notifications       | Plusieurs listeners réagissent au changement de statut, activables dynamiquement             | Observer                                   |             | ⬜     |
| 6. Undo / redo         | Sauvegarder/restaurer l'état du panier sans exposer ses détails (10 max)                     | **Memento** (à justifier, non vu en cours) |             | ⬜     |
| 7. Tests               | 1 test par stratégie de prix                                                                 | —                                          | `tests/`    | ⬜     |
| 8. Pizza personnalisée | Base + taille + ingrédients à la carte                                                       | Builder / Decorator                        |             | ⬜     |
| 9. Historique          | Liste triée et filtrée par statut                                                            | Repository                                 |             | ⬜     |

## Justifications

<!-- Une section par pattern, à remplir au fil des PR. Modèle :

### Strategy — Story 2
**Problème :** …
**Solution :** …
**Pourquoi ce pattern :** …
**Alternative écartée :** …
**Fichiers :** `src/domain/pricing/...`
-->
