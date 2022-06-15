import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "./schema/category.schema";

@Controller('/category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) { }
  @Get()
  async getAllCategory() {
    return await this.categoryService.getAllCategory();
  };
  @Post()
  async createCategory(@Body() data: Category) {
    return await this.categoryService.createCategory(data);
  }
}