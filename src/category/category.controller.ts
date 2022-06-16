import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
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

  @Get('/table')
  async getListCategoryTable (
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number
  ) {
    return this.categoryService.getCategoryTable(pageIndex, pageSize)
  }

  @Get('/:categoryId')
  async getCategory (@Param('categoryId') categoryId: string) {
    return await this.categoryService.findCategory(Number(categoryId))
  }
}