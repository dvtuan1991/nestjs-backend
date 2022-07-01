import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  id: string;
  @Prop()
  productId: number;
  @Prop()
  createAt: number;
  @Prop()
  rating: number;
  @Prop()
  comment: string;
  @Prop()
  isAnonymous: boolean;
  @Prop()
  userName: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
