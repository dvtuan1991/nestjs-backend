import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./schema/product.schema";
import { v4 as uuidv4 } from 'uuid';
import e from "express";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ) { }

  async create(data: Product) {
    let id;
    const maxValue = await this.productModel.find({}).sort({ id: -1 }).limit(1);
    if (maxValue.length > 0) {
      id = maxValue[0].id + 1;
    } else {
      id = 0
    };
    const createData = new this.productModel({ ...data, id: id });
    return createData.save();
  }

  async findAndUpdate (id: number, data: Product) {
    return await this.productModel.findOneAndUpdate({id: id}, data).exec();
  }

  async getAllProduct(): Promise<Product[]> {
    return this.productModel.find().exec();
  };

  async getListProductSale() {
    const allProduct = await this.getAllProduct();
    const listSale = allProduct.filter(product => product.oldPrice && product.oldPrice > 0);
    return listSale;
  };

  async getProduct(productId: number) {

    const product = await this.productModel.findOne({ id: productId }).exec();
    if (!product) {
      throw new NotFoundException();
    } else {
      return product
    }
  }
}