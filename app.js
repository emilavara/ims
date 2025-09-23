import express from 'express';

//routes
import productsRouter from './routes/products.js';
import manufacturersRouter from './routes/manufacturers.js';

const app = express();

//parse json bodies on EVERY request before handing off to routers
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/manufacturers', manufacturersRouter);

//dumb server -> client error reporter
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;