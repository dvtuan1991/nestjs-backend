import { Controller, Get, Post, Body } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./schema/product.schema";

@Controller('/product')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) {}
  
    @Get()
    async getAllProduct (): Promise<Product[]> {
      return this.productService.getAllProduct();
    };

    @Get('/sale')
    async getListSale (): Promise<Product[]> {
      return this.productService.getListProductSale()
    }
    @Post()
    async createProduct (@Body() data: Product) { 
      return this.productService.create(data);
    }
}