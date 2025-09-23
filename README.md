# IMS API

Ett enkelt Express-API för att hantera produkter och tillverkare.

## Kom igång
1. Kopiera `.env.example` till `.env` och fyll i `MONGODB_URI`.
2. Installera beroenden med `npm install`.
3. Starta utvecklingsservern med `npm run dev`.

## Endpoints

### Produkter
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

### Tillverkare
- `GET /api/manufacturers`
  - Lista alla tillverkare som finns i systemet.

## Exempel på produktpayload
```json
{
  "name": "Aurora LED Desk Lamp",
  "sku": "AUR-LAMP-001",
  "description": "Adjustable LED lamp with touch controls and USB charging port.",
  "price": 59.99,
  "category": "Lighting",
  "amountInStock": 18,
  "manufacturer": {
    "name": "Lumigen Ltd",
    "country": "Sweden",
    "website": "https://lumigen.example",
    "description": "Nordic lighting specialists.",
    "address": "Sveavägen 45, 111 34 Stockholm, Sweden",
    "contact": {
      "name": "Elsa Berg",
      "email": "elsa.berg@lumigen.example",
      "phone": "+46 8 123 456"
    }
  }
}
```
