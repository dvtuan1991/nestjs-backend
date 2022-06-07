import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id: string;
  @Prop()
  categoryId: string;
  @Prop()
  name: string;
  @Prop()
  thumbnail: string;
  @Prop()
  price: number;
  @Prop()
  decription: string;
  @Prop()
  isStock: boolean;
  @Prop()
  discount: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);