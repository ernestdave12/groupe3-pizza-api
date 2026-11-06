# infrastructure/

Implémentations techniques des ports du domaine (adapters) :

- `http/` : application Express, routes, mapping requête/réponse, Swagger
- `persistence/` : repositories en mémoire (la BDD n'est pas prioritaire)
- `payment/` : adapters des moyens de paiement simulés (Story 4)
- `notification/` : listeners email / SMS simulés (Story 5)
