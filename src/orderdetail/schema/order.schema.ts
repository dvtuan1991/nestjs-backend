import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  id: string;
  @Prop()
  productId: number;
  @Prop()
  userId: number;
  @Prop()
  isNew?: boolean;
  @Prop()
  isConfirm?: boolean;
  @Prop()
  isSuccess?: boolean;
  @Prop()
  isCancel?: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
