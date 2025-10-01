// Schema mirrors the REST API, so the two APIs can work in sync withou issues
const typeDefs = `#graphql
	type Contact {
		name: String!
		email: String!
		phone: String
	}

	type Manufacturer {
		name: String!
		country: String
		website: String
		description: String
		address: String
		contact: Contact!
	}

	type Product {
		id: ID!
		name: String!
		sku: String!
		description: String
		price: Float!
		category: String
		manufacturer: Manufacturer!
		amountInStock: Int!
		createdAt: String!
		updatedAt: String!
	}

	type ManufacturerStockValue {
		manufacturer: Manufacturer!
		totalStockValue: Float!
	}

	type CriticalStockProduct {
		manufacturer: String
		contact: Contact
	}

	type Query {
		products: [Product!]!
		product(id: ID!): Product
		totalStockValue: Float!
		totalStockValueByManufacturer: [ManufacturerStockValue!]!
		lowStockProducts: [Product!]!
		criticalStockProducts: [CriticalStockProduct!]!
		manufacturers: [Manufacturer!]!
	}

	input ContactInput {
		name: String!
		email: String!
		phone: String
	}

	input ManufacturerInput {
		name: String!
		country: String
		website: String
		description: String
		address: String
		contact: ContactInput!
	}

	input ProductInput {
		name: String!
		sku: String!
		description: String
		price: Float!
		category: String
		manufacturer: ManufacturerInput!
		amountInStock: Int!
	}

	input ProductUpdateInput {
		name: String
		sku: String
		description: String
		price: Float
		category: String
		manufacturer: ManufacturerInput
		amountInStock: Int
	}

	type Mutation {
		addProduct(input: ProductInput!): Product!
		updateProduct(id: ID!, input: ProductUpdateInput!): Product
		deleteProduct(id: ID!): Boolean!
	}
`;

export default typeDefs;