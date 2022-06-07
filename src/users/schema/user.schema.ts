import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;


@Schema()
export class User {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  username: string;
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
  isAmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);