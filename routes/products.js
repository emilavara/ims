import express from 'express';
import Product from '../models/product.js';
import { isValidObjectId } from '../scripts/helpers.js';

const router = express.Router();

//get every product
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

//get total stock value of products
router.get('/total-stock-value', async (req, res, next) => {
  try {
    const products = await Product.find({}, { price: 1, amountInStock: 1 });
    const totalStockValue = products.reduce((total, item) => total + item.price * item.amountInStock, 0);

    res.json({ totalStockValue });
  } catch (error) {
    next(error);
  }
});

//get total stock value by manufacturer
router.get('/total-stock-value-by-manufacturer', async (req, res, next) => {
  try {
    const products = await Product.find({}, { manufacturer: 1, price: 1, amountInStock: 1 });
    const totals = new Map();

    products.forEach((product) => {
      if (!product.manufacturer) {
        return;
      }

      const key = product.manufacturer.name || product._id.toString();
      const manufacturer = product.manufacturer.toObject();
      const current = totals.get(key) || { manufacturer, totalStockValue: 0 };
      current.totalStockValue += product.price * product.amountInStock;
      current.manufacturer = manufacturer;
      totals.set(key, current);
    });

    res.json(Array.from(totals.values()));
  } catch (error) {
    next(error);
  }
});

//get low stock
router.get('/low-stock', async (req, res, next) => {
  try {
    const products = await Product.find({ amountInStock: { $lt: 10 } }).sort({ amountInStock: 1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

//get critical stock of items
router.get('/critical-stock', async (req, res, next) => {
  try {
    const products = await Product.find({ amountInStock: { $lt: 5 } }, { manufacturer: 1 });
    const compactList = products.map((product) => {
      const manufacturerName = product.manufacturer?.name || null;
      const contact = product.manufacturer?.contact;

      return {
        manufacturer: manufacturerName,
        contact: contact
          ? {
              name: contact.name || null,
              email: contact.email || null,
              phone: contact.phone || null
            }
          : null
      };
    });

    res.json(compactList);
  } catch (error) {
    next(error);
  }
});

//get products by id
router.get('/:id', async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

//add product
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

//patch product by id
router.put('/:id', async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

//delete product by id
router.delete('/:id', async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;