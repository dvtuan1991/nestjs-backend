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
    const createData = new this.categoryModel({ ...data, id: uuidv4() });
    return createData.save();
  };

  async findCategoryByProductId(productId: string): Promise<Category> {
    return this.categoryModel.findOne({ id: productId }).exec();
  };
}