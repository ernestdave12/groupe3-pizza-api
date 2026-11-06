# groupe3-pizza-api

API marketplace de commande de pizzas multi-enseignes — projet Design Patterns, Groupe 3.

Le client choisit une enseigne (Da Michele, Rossopomodoro, Pizzium), compose sa commande, paie et suit sa livraison :
**Panier → Validation → Paiement → Suivi**.

## Stack

- Node.js 22 + **TypeScript** (strict)
- **Express 5**
- **Swagger / OpenAPI 3** (`docs/openapi.yaml`, servi par swagger-ui-express)
- Vitest + Supertest pour les tests
- ESLint + Prettier, CI GitHub Actions

## Démarrage

```bash
npm install
cp .env.example .env   # optionnel
npm run dev
```

- API : http://localhost:3000/health
- Swagger UI : http://localhost:3000/docs
- Contrat JSON : http://localhost:3000/docs.json

## Scripts

| Commande                          | Rôle                                                        |
| --------------------------------- | ----------------------------------------------------------- |
| `npm run dev`                     | Lance l'API en mode watch                                   |
| `npm run build` / `npm start`     | Compile dans `dist/` puis lance la version compilée         |
| `npm test`                        | Lance les tests                                             |
| `npm run lint` / `npm run format` | Lint / formatage                                            |
| `npm run check`                   | Tout vérifier avant une PR (typecheck, lint, format, tests) |

## Architecture

```
src/
├── domain/            # Métier pur + patterns (aucune dépendance technique)
├── application/       # Cas d'usage qui orchestrent le domaine
├── infrastructure/    # Adapters techniques
│   ├── http/          # Express, routes, Swagger
│   ├── persistence/   # Repositories en mémoire
│   ├── payment/       # Moyens de paiement simulés
│   └── notification/  # Listeners email/SMS simulés
├── config/
└── server.ts          # Point d'entrée
tests/
docs/
├── openapi.yaml       # Contrat de l'API (source de vérité Swagger)
└── patterns.md        # Patterns utilisés et justifications
```

Les dépendances vont toujours vers l'intérieur : `infrastructure → application → domain`.

## Backlog

| #   | Story                        | Pattern pressenti       |
| --- | ---------------------------- | ----------------------- |
| 1   | Enseignes et pizzas          | Factory                 |
| 2   | Calcul du prix               | Strategy                |
| 3   | Validation de commande       | Chain of Responsibility |
| 4   | Paiement                     | Adapter                 |
| 5   | Notifications                | Observer                |
| 6   | Annuler les modifications    | Memento                 |
| 7   | Tests des stratégies de prix | —                       |
| 8   | Pizza personnalisée          | Builder / Decorator     |
| 9   | Historique                   | Repository              |

Détails et justifications : [docs/patterns.md](docs/patterns.md).

## Contribuer

Voir [CONTRIBUTING.md](CONTRIBUTING.md) : workflow `feature/* → dev → main`, conventions de branches et de commits, règles de PR.
