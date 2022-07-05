import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotImplementedException,
  UseInterceptors,
  UploadedFile,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { basename } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct(): Promise<Product[]> {
    return this.productService.getAllProduct();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/upload',
        filename: (req: any, file: any, cb: any) => {
          // Calling the callback passing the random name generated with the original extension name
          cb(null, `${uuidv4()}${file.originalname}`);
        },
      }),
    }),
  )
  async createProduct(
    @Body() data: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log(1);
    if (file && file.path) {
      data.newPrice = Number(data.newPrice);
      data.priority = Number(data.priority);
      data.categoryId = Number(data.categoryId);
      data.oldPrice && (data.oldPrice = Number(data.oldPrice));
      console.log('file');
      return this.productService.create({
        ...data,
        thumbnail: `/${basename(file.path)}`,
      });
    }
  }

  @Get('table')
  async getListProductTable(
    @Query('pageIndex') pageIndex?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.productService.getProductTable(
      Number(pageIndex),
      Number(pageSize),
    );
  }
  @Get('list')
  async getProductAppList(
    @Query('index') index: string,
    @Query('limit') limit: string,
    @Query('sort') sort: string,
    @Query('min') min?: string,
    @Query('max') max?: string,
    @Query('name') name?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    if (min && max) {
      return this.productService.filterProductHome(
        Number(index),
        Number(limit),
        sort,
        Number(min),
        Number(max),
      );
    }
    return this.productService.filterProductHome(
      Number(index),
      Number(limit),
      sort,
    );
  }
  @Get("category/:categoryId")
  async getProductByCategoryId (@Param("categoryId") categoryId: string) {
    return this.productService.getProductByCategoryId(Number(categoryId))
  }

  @Get('hot')
  async getHotProduct() {
    return this.productService.getHotProduct();
  }

  @Put('/:productId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/upload',
        filename: (req: any, file: any, cb: any) => {
          // Calling the callback passing the random name generated with the original extension name
          cb(null, `${uuidv4()}${file.originalname}`);
        },
      }),
    }),
  )
  async updateProduct(
    @Param('productId') productId: number,
    @Body() data: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    data.newPrice = Number(data.newPrice);
    data.priority = Number(data.priority);
    data.categoryId = Number(data.categoryId);
    data.oldPrice && (data.oldPrice = Number(data.oldPrice));
    if (file && file.path) {
      return this.productService.findAndUpdate(Number(productId), {
        ...data,
        thumbnail: `/${basename(file.path)}`,
      });
    } else {
      return this.productService.findAndUpdate(Number(productId), data);
    }
  }

  @Get('/sale')
  async getListSale(): Promise<Product[]> {
    return this.productService.getListProductSale();
  }

  @Get('/:productId')
  async getProduct(@Param('productId') productId: string) {
    if (Number(productId) || productId === '0') {
      return this.productService.getProduct(Number(productId));
    } else {
      throw new NotImplementedException();
    }
  }

  @Delete('/:productId/delete')
  async deleteProduct(@Param('productId') productId: string) {
    return this.productService.findAndDelte(Number(productId));
  }
}
