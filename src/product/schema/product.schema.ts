import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id?: number;
  @Prop()
  categoryId: number;
  @Prop()
  name: string;
  @Prop()
  thumbnail: string;
  @Prop()
  newPrice: number;
  @Prop()
  oldPrice?: number;
  @Prop()
  decription: string;
  @Prop()
  createAt: number;
  @Prop()
  isStock: boolean;
  @Prop()
  ordinalNum?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
