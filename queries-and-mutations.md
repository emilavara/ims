# GraphQL Queries & Mutations

## Query: `products`
```graphql
query Products {
  products {
    id
    name
    sku
    price
    amountInStock
    manufacturer {
      name
      country
    }
  }
}
```

## Query: `product`
```graphql
query Product($id: ID!) {
  product(id: $id) {
    id
    name
    description
    price
    manufacturer {
      name
      contact {
        email
      }
    }
  }
}
```

## Query: `totalStockValue`
```graphql
query TotalStockValue {
  totalStockValue
}
```

## Query: `totalStockValueByManufacturer`
```graphql
query TotalStockValueByManufacturer {
  totalStockValueByManufacturer {
    manufacturer {
      name
      contact {
        name
        email
      }
    }
    totalStockValue
  }
}
```

## Query: `lowStockProducts`
```graphql
query LowStockProducts {
  lowStockProducts {
    id
    name
    amountInStock
  }
}
```

## Query: `criticalStockProducts`
```graphql
query CriticalStockProducts {
  criticalStockProducts {
    manufacturer
    contact {
      name
      email
      phone
    }
  }
}
```

## Query: `manufacturers`
```graphql
query Manufacturers {
  manufacturers {
    name
    country
    contact {
      name
      email
    }
  }
}
```

## Mutation: `addProduct`
```graphql
mutation AddProduct($input: ProductInput!) {
  addProduct(input: $input) {
    id
    name
    sku
  }
}
```

### Example variables
```json
{
  "input": {
    "name": "Streaming Microphone",
    "sku": "MIC-9000",
    "description": "USB-C condenser mic with noise gate",
    "price": 249.99,
    "category": "Audio",
    "amountInStock": 25,
    "manufacturer": {
      "name": "SoundWorks",
      "country": "Sweden",
      "website": "https://soundworks.example",
      "description": "Audio gear for creators",
      "address": "Sound Street 42, Stockholm",
      "contact": {
        "name": "Sara Holm",
        "email": "sara.holm@soundworks.example",
        "phone": "+46-8-555-123"
      }
    }
  }
}
```

## Mutation: `updateProduct`
```graphql
mutation UpdateProduct($id: ID!, $input: ProductUpdateInput!) {
  updateProduct(id: $id, input: $input) {
    id
    name
    amountInStock
  }
}
```

### Example variables
```json
{
  "id": "PUT_PRODUCT_ID_HERE",
  "input": {
    "amountInStock": 14,
    "price": 219.5
  }
}
```

## Mutation: `deleteProduct`
```graphql
mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
```

### Example variables
```json
{
  "id": "PUT_PRODUCT_ID_HERE"
}
```
