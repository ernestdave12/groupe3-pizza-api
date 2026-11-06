# application/

Cas d'usage (use cases) qui orchestrent le domaine : `AddPizzaToCart`, `ValidateOrder`,
`PayOrder`, `UndoCartChange`, `GetOrderHistory`…
Ne dépend que de `domain/` (via ses interfaces), jamais de l'infrastructure.
