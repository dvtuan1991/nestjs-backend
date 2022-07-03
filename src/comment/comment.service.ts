import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { v4 as uuidv4 } from 'uuid';

export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async getAllComment() {
    return this.commentModel.find().exec();
  }

  async createComment(data: Comment) {
    const createData = new this.commentModel({
      ...data,
      id: uuidv4(),
      createAt: Date.now(),
    });
    return createData.save();
  }
  async getCommentByProductId(productId: number) {
    return this.commentModel.find({ productId }).exec();
  }

  filterCommentByPoint(listComment: Comment[], point: number) {
    if (point === 0) {
      return listComment;
    }
    return listComment.filter((comment) => comment.rating === point);
  }

  sortCommnet(listComment: Comment[], sortType: string) {
    switch (sortType) {
      case 'new':
        listComment.sort((a, b) => b.createAt - a.createAt);
        break;
      case 'old':
        listComment.sort((a, b) => a.createAt - b.createAt);
        break;
      default:
        break;
    }
    return listComment;
  }

  getListByLimit(listComment: Comment[], index: number, limit: number) {
    const leng = listComment.length;
    let startIndex = (index - 1) * limit;
    let endIndex = index * limit;
    if (startIndex >= leng) {
      startIndex = (Math.floor(leng / startIndex) - 1) * index;
      endIndex = Math.floor(leng / startIndex) * index;
    }
    const result = listComment.slice(startIndex, endIndex);
    return result;
  }

  async getListCommnetByProductIdAndLimit(
    productId: number,
    index: number,
    limit: number,
    point: number,
    sortType: string,
  ) {
    const listCommnetByProproductId = await this.getCommentByProductId(
      productId,
    );
    const filterList = this.filterCommentByPoint(
      listCommnetByProproductId,
      point,
    );
    const sortList = this.sortCommnet(filterList, sortType);
    const listComment = this.getListByLimit(sortList, index, limit);
    return {
      listComment,
      leng: sortList.length,
    };
  }

  statisticComment(comments: Comment[]) {
    let statistic = [];
    for (let i = 1; i <= 5; i++) {
      let filter = comments.filter((item) => item.rating === i);
      statistic.push({ ratingPoint: i, total: filter.length });
    }
    return {
      leng: comments.length,
      statistic,
    };
  }

  async getAvgPoint(productId: number) {
    const lists = await this.statisticListProductComment(productId);
    const totalPoint = lists.statistic.reduce(
      (total, curr) => total + curr.ratingPoint * curr.total,
      0,
    );
    return (totalPoint * 5) / (lists.leng * 5);
  }

  async statisticListProductComment(productId: number) {
    const lists = await this.getCommentByProductId(productId);
    return this.statisticComment(lists);
  }
}
