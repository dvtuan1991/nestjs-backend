import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Category, CategoryDocument } from './schema/category.schema';

export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getAllCategory(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async getCategoryTable(pageIndex?: number, pageSize?: number) {
    let listCategory: Category[];
    let startIndex = 0;
    const allCategory = await this.categoryModel.find().exec();
    const totalCategory = allCategory.length;
    if (pageIndex && pageSize) {
      startIndex = (pageIndex - 1) * pageSize;
      let endIndex = pageIndex * pageSize;
      if (startIndex >= totalCategory) {
        startIndex = (Math.floor(totalCategory / startIndex) - 1) * pageSize;
        endIndex = Math.floor(totalCategory / startIndex) * pageSize;
      }
      listCategory = allCategory.slice(startIndex, endIndex);
    }
    if (!pageIndex || !pageSize) {
      listCategory = allCategory;
    }
    for (let i = 0; i < listCategory.length; i++) {
      listCategory[i].ordinalNum = startIndex + 1;
      startIndex++;
    }
    return { listCategory, totalCategory };
  }

  async createCategory(data: Category) {
    let id: number;
    const maxValue = await this.categoryModel
      .find({})
      .sort({ id: -1 })
      .limit(1);
    if (maxValue.length > 0) {
      id = maxValue[0].id + 1;
    } else {
      id = 0;
    }
    const createData = new this.categoryModel({ ...data, id: id });
    return createData.save();
  }

  async findCategory(categoryId: number): Promise<Category> {
    return this.categoryModel.findOne({ id: categoryId }).exec();
  }

  async findAndUpdate(id: number, data: Category) {
    return await this.categoryModel.findOneAndUpdate({ id }, data).exec();
  }

  async findAndDelete(id: number) {
    try {
      return await this.categoryModel.findOneAndDelete({ id: id }).exec();
    } catch (error) {
      throw error;
    }
  }
}
