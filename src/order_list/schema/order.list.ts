import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderListDocument = OrderList & Document;
@Schema()
export class OrderList {
  @Prop()
  id: string;
  @Prop()
  userId: number;
  @Prop()
  isComplete: boolean;
  @Prop()
  userPhone: string;
  @Prop()
  userName: string;
  @Prop()
  userAddress: string;
  @Prop()
  totalPrice: number;
  @Prop()
  createAt: number;
  @Prop()
  isCancel?: boolean;
  @Prop()
  ordinalNum?: number;
}

export const OrderListSchema = SchemaFactory.createForClass(OrderList);
