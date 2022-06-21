import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(data: Product) {
    let id: number;
    const maxValue = await this.productModel.find({}).sort({ id: -1 }).limit(1);
    if (maxValue.length > 0) {
      id = maxValue[0].id + 1;
    } else {
      id = 0;
    }
    const createData = new this.productModel({ ...data, id: id });
    return createData.save();
  }

  async findAndUpdate(id: number, data: Product) {
    return await this.productModel.findOneAndUpdate({ id: id }, data).exec();
  }

  async getAllProduct(
    pageIndex?: number,
    pageSize?: number,
  ): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async getProductTable(pageIndex?: number, pageSize?: number) {
    let listProduct: Product[];
    let startIndex = 0;
    const allProduct = await this.productModel.find().exec();
    const totalProduct = allProduct.length;
    if (pageIndex && pageSize) {
      startIndex = (pageIndex - 1) * pageSize;
      let endIndex = pageIndex * pageSize;
      if (startIndex >= totalProduct) {
        startIndex = (Math.floor(totalProduct / startIndex) - 1) * pageSize;
        endIndex = Math.floor(totalProduct / startIndex) * pageSize;
      }
      listProduct = allProduct.slice(startIndex, endIndex);
    }
    if (!pageIndex || !pageSize) {
      listProduct = allProduct;
    }
    for (let i = 0; i < listProduct.length; i++) {
      listProduct[i].ordinalNum = startIndex + 1;
      startIndex++;
    }
    return { listProduct, totalProduct };
  }

  async getHotProduct() {
    const allProduct = await this.getAllProduct();
    allProduct.sort((a, b) => b.priority - a.priority);
    return allProduct.slice(0, 4);
  }

  async getListProductSale() {
    const allProduct = await this.getAllProduct();
    const listSale = allProduct.filter(
      (product) => product.oldPrice && product.oldPrice > 0,
    );
    return listSale;
  }

  async getProduct(productId: number) {
    const product = await this.productModel.findOne({ id: productId }).exec();
    if (!product) {
      throw new NotFoundException();
    } else {
      return product;
    }
  }

  async findAndDelte(id: number) {
    try {
      return await this.productModel.findOneAndDelete({ id: id }).exec();
    } catch (error) {
      throw error;
    }
  }
}
