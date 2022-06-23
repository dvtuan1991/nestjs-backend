import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: number;
  @Prop()
  name: string;
  @Prop()
  userName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  address: string;
  @Prop()
  phone: number;
  @Prop()
  avatar?: string;
  @Prop()
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);