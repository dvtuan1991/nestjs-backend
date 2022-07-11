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
    const createData = new this.productModel({
      ...data,
      id: id,
      createAt: Date.now(),
    });
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

  async filterListProduct(
    min: number,
    max: number,
    categoryId: number,
    productName: string,
  ) {
    let model = this.productModel;
    const queryObj: any = {};
    if (min && max) {
      queryObj.oldPrice = { $gte: min, $lte: max };
    }

    if (Number(categoryId) >= 0) {
      queryObj.categoryId = Number(categoryId);
    }
    if (productName) {
      queryObj.name = new RegExp(productName, "i");
    }
    console.log(queryObj);
    let query = this.productModel.find(queryObj);
    if (Number(categoryId) === -2) {
      query = query.$where('this.oldPrice > this.newPrice');
    }

    const result = await query.exec();
    return result;

  }

  sortListProduct(listProduct: Product[], sortType: string) {
    switch (sortType) {
      case 'ascent':
        listProduct.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case 'decent':
        listProduct.sort((a, b) => b.newPrice - a.newPrice);
        break;
      default:
        listProduct.sort((a, b) => b.id - a.id);
        break;
    }
    return listProduct;
  }

  getListByLimit(listProduct: Product[], index: number, limit: number) {
    const leng = listProduct.length;
    let startIndex = (index - 1) * limit;
    let endIndex = index * limit;
    if (startIndex >= leng) {
      startIndex = (Math.floor(leng / startIndex) - 1) * index;
      endIndex = Math.floor(leng / startIndex) * index;
    }
    console.log(startIndex, endIndex);
    const result = listProduct.slice(startIndex, endIndex);
    for (let i = 0; i < result.length; i++) {
      result[i].ordinalNum = startIndex + 1;
      startIndex++;
    }
    return result;
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

  async filterProductHome(
    pageIndex: number = 1,
    pageSize: number,
    sortType: string,
    min: number = 1,
    max: number = 100,
    categoryId: number,
    productName: string,
  ) {
    const filter = await this.filterListProduct(
      min,
      max,
      categoryId,
      productName,
    );
    if (filter.length === 0) {
      return { listProduct: [], total: 0 };
    }
    const sort = this.sortListProduct(filter, sortType);
    const listByLimit = this.getListByLimit(sort, pageIndex, pageSize);
    return {
      listProduct: listByLimit,
      total: sort.length,
    };
  }

  async getHotProduct() {
    const allProduct = await this.getAllProduct();
    allProduct.sort((a, b) => b.id - a.id);
    return allProduct.slice(0, 4);
  }

  async getProductByCategoryId(categoryId: number) {
    return this.productModel.find({ categoryId }).exec();
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
