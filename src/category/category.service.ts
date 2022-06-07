import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "./schema/category.schema";

export class CategoryService{
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}
}