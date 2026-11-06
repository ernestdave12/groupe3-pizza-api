# Guide de contribution — Groupe 3

## Workflow Git

```
main  ←──  dev  ←──  feature/…, fix/…, docs/…, chore/…
```

- **`main`** : branche protégée, version rendue. On n'y pousse jamais directement : uniquement des PR depuis `dev`.
- **`dev`** : branche d'intégration. Toutes les PR de travail ciblent `dev`.
- **Chacun crée sa propre branche** à partir de `dev`, pour chaque story ou tâche.

### Créer sa branche

```bash
git checkout dev
git pull origin dev
git checkout -b feature/story-2-pricing-strategies
```

### Nommage des branches

`<type>/<story>-<description-courte>` en minuscules, mots séparés par des tirets.

| Type        | Usage                               | Exemple                            |
| ----------- | ----------------------------------- | ---------------------------------- |
| `feature/`  | Nouvelle fonctionnalité (story)     | `feature/story-3-order-validation` |
| `fix/`      | Correction de bug                   | `fix/story-2-happy-hour-rounding`  |
| `docs/`     | Documentation, Swagger, patterns.md | `docs/openapi-payment`             |
| `refactor/` | Refacto sans changement fonctionnel | `refactor/cart-domain`             |
| `test/`     | Ajout / correction de tests         | `test/story-7-pricing`             |
| `chore/`    | Outillage, config, dépendances      | `chore/update-eslint`              |

## Commits — Conventional Commits

Format : `<type>(<scope>): <description>` à l'impératif, en français ou en anglais (mais restons cohérents).

```
feat(pricing): ajouter la stratégie Happy Hour
fix(validation): arrêter la chaîne à la première erreur
docs(patterns): justifier le choix du Memento
test(pricing): couvrir la stratégie fidélité
refactor(cart): extraire le calcul du total
chore: configurer prettier
```

Scopes conseillés : `brands`, `pricing`, `validation`, `payment`, `notification`, `cart`, `custom-pizza`, `history`, `api`, `docs`.

## Pull Requests

1. Avant de pousser : `npm run check` (typecheck + lint + format + tests) doit passer.
2. Ouvrir la PR **vers `dev`**, remplir le template, lier l'issue (`Closes #<numéro>`).
3. **Au moins 1 review** d'un autre membre avant merge.
4. La CI GitHub doit être verte.
5. Merge en **squash** de préférence, puis supprimer la branche.
6. Garder les PR petites : une story (ou une partie de story) par PR.

Si la PR ajoute ou modifie une route : mettre à jour `docs/openapi.yaml` dans la même PR.
Si elle introduit un pattern : compléter `docs/patterns.md` (où + pourquoi).

## Règles de code

- Architecture en couches (voir README) : `domain` ne dépend de rien d'externe (pas d'Express).
- Programmer contre des **interfaces** : ajouter une enseigne, une stratégie, une règle de validation ou un listener
  ne doit pas modifier les classes existantes (principe ouvert/fermé).
- Un fichier = une classe/responsabilité principale. Noms de fichiers en `kebab-case`, classes en `PascalCase`.
- Pas de `any` sans justification.
