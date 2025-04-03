import { Schema, model, Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  price: number;
  description?: string;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false }
});

export const Product = model<Product>('Product', productSchema);
