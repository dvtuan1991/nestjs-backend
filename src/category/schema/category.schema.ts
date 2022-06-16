import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document

@Schema()
export class Category {
  @Prop()
  id?: number;
  @Prop()
  name: string;
  @Prop()
  ordinalNum?: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);