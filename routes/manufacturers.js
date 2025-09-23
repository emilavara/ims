import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

//list manufacturers
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find({}, { manufacturer: 1 });
    const manufacturers = new Map();

    products.forEach((product) => {
      if (!product.manufacturer || !product.manufacturer.name) {
        return;
      }

      const key = product.manufacturer.name;
      if (!manufacturers.has(key)) {
        manufacturers.set(key, product.manufacturer.toObject());
      }
    });

    res.json(Array.from(manufacturers.values()));
  } catch (error) {
    next(error);
  }
});

export default router;