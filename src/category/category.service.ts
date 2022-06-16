import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

import { Category, CategoryDocument } from "./schema/category.schema";

export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) { }

  async getAllCategory(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async createCategory(data: Category) {
    let id: number;
    const maxValue = await this.categoryModel.find({}).sort({id: -1}).limit(1);
    if (maxValue.length > 0) {
      id = maxValue[0].id + 1;
    } else {
      id = 0
    };
    const createData = new this.categoryModel({ ...data, id: id });
    return createData.save();
  };

  async findCategory(categoryId: number): Promise<Category> {
    return this.categoryModel.findOne({ id: categoryId }).exec();
  };
}