import Product from '../../models/product.js';
import { mapProduct, toPlain } from '../utils/mappers.js';
import { isValidObjectId } from '../../scripts/helpers.js';

// Keep object id checks in one place so resolvers and routes behave the same
const resolvers = {
  Query: {
    products: async () => {
      const products = await Product.find().sort({ name: 1 });
      return products.map(mapProduct);
    },
    product: async (_parent, { id }) => {
      if (!isValidObjectId(id)) {
        return null;
      }
      const product = await Product.findById(id);
      return product ? mapProduct(product) : null;
    },
    totalStockValue: async () => {
      const products = await Product.find({}, { price: 1, amountInStock: 1 });
      return products.reduce((total, item) => total + item.price * item.amountInStock, 0);
    },
    totalStockValueByManufacturer: async () => {
      const products = await Product.find({}, { manufacturer: 1, price: 1, amountInStock: 1 });
      const totals = new Map();

      products.forEach((product) => {
        const manufacturer = toPlain(product.manufacturer);
        if (!manufacturer || !manufacturer.name) {
          return;
        }

        const key = manufacturer.name;
        // Sum each manufacturer stock value by name, returns tidey array
        const current = totals.get(key) || { manufacturer, totalStockValue: 0 };
        current.totalStockValue += product.price * product.amountInStock;
        totals.set(key, current);
      });

      return Array.from(totals.values());
    },
    lowStockProducts: async () => {
      const products = await Product.find({ amountInStock: { $lt: 10 } }).sort({ amountInStock: 1 });
      return products.map(mapProduct);
    },
    criticalStockProducts: async () => {
      const products = await Product.find({ amountInStock: { $lt: 5 } }, { manufacturer: 1 });
      return products.map((product) => {
        const manufacturer = toPlain(product.manufacturer);
        const contact = manufacturer?.contact ? toPlain(manufacturer.contact) : null;
        return {
          manufacturer: manufacturer?.name ?? null,
          contact: contact
            ? {
                name: contact.name ?? null,
                email: contact.email ?? null,
                phone: contact.phone ?? null
              }
            : null
        };
      });
    },
    manufacturers: async () => {
      const products = await Product.find({}, { manufacturer: 1 });
      const manufacturers = new Map();

      products.forEach((product) => {
        const manufacturer = toPlain(product.manufacturer);
        if (!manufacturer || !manufacturer.name) {
          return;
        }

        // Avoid duplicate entries when several products share name
        if (!manufacturers.has(manufacturer.name)) {
          manufacturers.set(manufacturer.name, manufacturer);
        }
      });

      return Array.from(manufacturers.values());
    }
  },
  Mutation: {
    addProduct: async (_parent, { input }) => {
      const created = await Product.create(input);
      return mapProduct(created);
    },
    updateProduct: async (_parent, { id, input }) => {
      if (!isValidObjectId(id)) {
        return null;
      }
      const updated = await Product.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true
      });
      return updated ? mapProduct(updated) : null;
    },
    deleteProduct: async (_parent, { id }) => {
      if (!isValidObjectId(id)) {
        return false;
      }
      const deleted = await Product.findByIdAndDelete(id);
      return Boolean(deleted);
    }
  }
};

export default resolvers;