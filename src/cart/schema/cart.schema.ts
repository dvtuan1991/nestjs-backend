import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop()
  id: string;
  @Prop()
  foodId: string;
  @Prop()
  userId: string;
  @Prop()
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);