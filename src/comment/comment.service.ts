import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { v4 as uuidv4 } from 'uuid';

export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createComment(data: Comment) {
    const createData = new this.commentModel({
      ...data,
      id: uuidv4(),
      createAt: Date.now(),
    });
    return createData.save();
  }
  async getCommentByProductId (productId: number) {
    return this.commentModel.find({productId}).exec();
  }
}
