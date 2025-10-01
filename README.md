# IMS Gruppuppgift – Grupp 9

Ett RESTful API, och ett GraphQLAPI som integrerar med samma MongoDB-databas.

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

## GraphQL

- Endpoint: `POST /graphql` (Apollo Sandbox nås via webbläsaren på samma adress)

### Queries

- `products` – listar alla produkter.
- `product(id: ID!)` – hämtar en specifik produkt via dess MongoDB-ID.
- `totalStockValue` – summerar lagervärdet för alla produkter.
- `totalStockValueByManufacturer` – summerar lagervärden per tillverkare.
- `lowStockProducts` – visar produkter med mindre än 10 enheter i lager.
- `criticalStockProducts` – visar produkter med mindre än 5 enheter och inkluderar kontaktinfo.
- `manufacturers` – listar unika tillverkare baserat på produkterna i databasen.

### Mutationer

- `addProduct(input: ProductInput!)` – skapar en ny produkt.
- `updateProduct(id: ID!, input: ProductUpdateInput!)` – uppdaterar en befintlig produkt.
- `deleteProduct(id: ID!)` – tar bort en produkt.