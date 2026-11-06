# Design patterns utilisés

> Critère n°1 de l'évaluation : **patterns utilisés et justifiés**.
> Chaque PR qui introduit un pattern complète sa ligne ci-dessous (où, pourquoi, alternative écartée).

| Story                  | Besoin                                                                                       | Pattern pressenti                 | Emplacement                        | Statut |
| ---------------------- | -------------------------------------------------------------------------------------------- | --------------------------------- | ---------------------------------- | ------ |
| 1. Enseignes et pizzas | Ajouter une enseigne = ajouter une classe ; chaque enseigne a son menu et ses règles de prix | Factory Method / Abstract Factory |                                    | ⬜     |
| 2. Calcul du prix      | Standard, Happy Hour, code promo, fidélité ; facile d'en ajouter                             | Strategy                          |                                    | ⬜     |
| 3. Validation          | Règles chaînées, première erreur = stop                                                      | Chain of Responsibility           |                                    | ⬜     |
| 4. Paiement            | 3 moyens aux signatures différentes, interchangeables dynamiquement                          | Adapter (+ Strategy)              |                                    | ⬜     |
| 5. Notifications       | Plusieurs listeners réagissent au changement de statut, activables dynamiquement             | Observer                          |                                    | ⬜     |
| 6. Undo / redo         | Sauvegarder/restaurer l'état du panier sans exposer ses détails (10 max)                     | **Memento**                       | `src/domain/cart-history/`, `Cart` | ✅     |
| 7. Tests               | 1 test par stratégie de prix                                                                 | —                                 | `tests/`                           | ⬜     |
| 8. Pizza personnalisée | Base + taille + ingrédients à la carte                                                       | Builder / Decorator               |                                    | ⬜     |
| 9. Historique          | Liste triée et filtrée par statut                                                            | Repository                        |                                    | ⬜     |

## Justifications

### Memento - Story 6

**Problème :** annuler et rétablir les modifications du panier sans confier son état interne au gestionnaire d'historique.

**Solution :** `Cart` est l'Originator : il crée les sauvegardes et restaure ses lignes via une clé privée propre à son instance. `CartMemento` conserve les lignes dans un champ JavaScript privé et ne restitue une copie qu'au propriétaire de cette clé. `CartHistory` est le Caretaker : ses deux piles privées ne contiennent que des Mementos opaques ; il demande au panier de sauvegarder et restaurer via deux callbacks.

**Intégration :** les méthodes existantes `addItem`, `removeItem` et `changeSize` enregistrent automatiquement l'état précédent après une modification réussie. `cart.undo()` et `cart.redo()` renvoient `true` si la restauration a eu lieu, `false` si aucune étape n'est disponible. Les propriétés `canUndo` et `canRedo` indiquent leur disponibilité. Chaque panier possède son propre historique en mémoire, limité à dix étapes annulables. Aucune route HTTP ni persistance supplémentaire n'est ajoutée.

**Cohérence :** une nouvelle modification vide redo ; les erreurs et les changements sans effet le préservent. Les nouvelles lignes et tailles sont préparées et validées avant de remplacer l'état. Les lignes du modèle actuel sont des données définies par interfaces, sans méthodes ni instances métier imbriquées : une copie explicite des lignes, compositions et tableaux d'ingrédients suffit et évite la sérialisation JSON. Cette copie est effectuée à l'entrée, à la sortie, à la sauvegarde et à la restauration. Si le modèle introduit des instances de classes, cette copie devra évoluer avec lui. Le sous-total reste calculé par `Cart.getSubtotal()` ; aucun calcul de prix parallèle n'est ajouté. Le modèle ne possède pas de quantité : chaque ligne représente une pizza.

**Pourquoi ce pattern :** l'historique conserve des états sans interpréter les lignes. Une simple copie superficielle partagerait les ingrédients ; une référence au panier perdrait les anciens états.

**Alternative écartée :** Command permettrait de conserver des actions inverses, mais imposerait une logique d'inversion pour chaque opération alors que le besoin demande la restauration d'un état encapsulé.

**Fichiers :** `src/domain/cart-history/`, `src/domain/shared/models/cart.ts`, `src/domain/shared/interfaces/cart.interface.ts`.

<!-- Une section par pattern, à remplir au fil des PR. Modèle :

### Strategy — Story 2
**Problème :** …
**Solution :** …
**Pourquoi ce pattern :** …
**Alternative écartée :** …
**Fichiers :** `src/domain/pricing/...`
-->
