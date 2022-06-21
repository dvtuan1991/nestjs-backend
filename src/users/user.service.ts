import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(data: User): Promise<User> {
    const createData = new this.userModel({ ...data, id: uuidv4() });
    return createData.save();
  }

  async findUser(userName: string) {
    console.log("find User")
    return this.userModel.findOne({ userName: userName }).exec();
  };

  async findUserById (id: string) {
    return this.userModel.findOne({id: id}).exec()
  }
}
