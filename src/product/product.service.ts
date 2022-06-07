import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./schema/product.schema";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ) {}

  async create (data: Product) {
    const createData =  new this.productModel({...data, id: uuidv4()})
    return createData.save();
  }

  async getAllProduct (): Promise<Product[]> {
    return this.productModel.find().exec();
  };

  async getListProductSale () {
    const allProduct = await this.getAllProduct();
    const listSale = allProduct.filter(product => product.oldPrice && product.oldPrice > 0);
    return listSale;
  };
}