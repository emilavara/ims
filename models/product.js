import mongoose from 'mongoose';

//contact schema
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true }
  },
  { _id: false }
);

//manufacturer schema -> embeddes contact schema
const manufacturerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    website: { type: String, trim: true },
    description: { type: String },
    address: { type: String },
    contact: { type: contactSchema, required: true }
  },
  { _id: false }
);

//actual product schema -> embeds manufacturer & contact schemas
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, trim: true, uppercase: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, trim: true },
    manufacturer: { type: manufacturerSchema, required: true },
    amountInStock: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

//export the single product model
const Product = mongoose.model('Product', productSchema);

export default Product;