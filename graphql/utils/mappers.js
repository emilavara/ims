export const toIsoString = (value) => {
  if (!value) return new Date(0).toISOString();
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
};

// Parse mongoose documents/subdocuments to plain JSON
export const toPlain = (value) => {
  if (!value) return value;
  return typeof value.toObject === 'function' ? value.toObject() : value;
};

// Normalise product documents
export const mapProduct = (doc) => {
  const obj = toPlain(doc);
  return {
    id: obj._id?.toString() ?? '',
    name: obj.name,
    sku: obj.sku,
    description: obj.description,
    price: obj.price,
    category: obj.category,
    manufacturer: toPlain(obj.manufacturer),
    amountInStock: obj.amountInStock,
    createdAt: toIsoString(obj.createdAt),
    updatedAt: toIsoString(obj.updatedAt)
  };
};

export default {
  toIsoString,
  toPlain,
  mapProduct
};