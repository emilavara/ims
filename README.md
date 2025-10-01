# IMS Gruppuppgift

Ett enkelt Express-API och GraphQL api för att hantera produkter och tillverkare.

## Endpoints

#### Produkter
- `GET /api/products`
  - Lista alla produkter.
- `GET /api/products/:id`
  - Hämta detaljer om en specifik produkt.
- `POST /api/products`
  - Skapa en ny produkt. Skicka JSON som i exemplen nedan.
- `PUT /api/products/:id`
  - Uppdatera en befintlig produkt.
- `DELETE /api/products/:id`
  - Ta bort en produkt.

#### Rapporter
- `GET /api/products/total-stock-value`
  - Returnerar värdet av allt lager (`price * amountInStock`).
- `GET /api/products/total-stock-value-by-manufacturer`
  - Summerar lagervärdet per tillverkare.
- `GET /api/products/low-stock`
  - Visar produkter med mindre än 10 enheter i lager.
- `GET /api/products/critical-stock`
  - Returnerar en kompakt lista för produkter med mindre än 5 enheter.

#### Manufacturers
- `GET /api/manufacturers`
  - Lista alla tillverkare som finns i systemet.
