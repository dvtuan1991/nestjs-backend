import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderList, OrderListDocument } from './schema/order.list';
import { v4 as uuidv4 } from 'uuid';

enum FilterType {
  CANCEL = 'cancel',
  COMPLETE = 'complete',
  SHIPPING = 'shipping',
}

enum SortType {
  NEWEST = 'new',
  OLDEST = 'old',
  DEFAULT = 'none',
  ASCENT = 'ascent',
  DECENT = 'decent',
}

export class OrderListService {
  constructor(
    @InjectModel(OrderList.name)
    private orderListModel: Model<OrderListDocument>,
  ) {}

  async createOrderList(data: OrderList) {
    const createData = new this.orderListModel({
      ...data,
      id: uuidv4(),
      isComplete: false,
    });
    return createData.save();
  }

  async getAllOrder() {
    return await this.orderListModel.find().exec();
  }

  filterOrderByStatus(orders: OrderList[], status: string) {
    let result = [];
    switch (status.toLowerCase()) {
      case FilterType.CANCEL:
        result = orders.filter((order) => order.isCancel);
        break;
      case FilterType.COMPLETE:
        result = orders.filter((order) => order.isComplete);
        break;
      case FilterType.SHIPPING:
        result = orders.filter((order) => !order.isComplete && !order.isCancel);
        break;

      default:
        result = orders
          .filter((order) => !order.isComplete)
          .concat(orders.filter((order) => order.isComplete));
        break;
    }
    return result;
  }

  sortOrder(orders: OrderList[], sortType: string) {
    switch (sortType.toLowerCase()) {
      case SortType.NEWEST:
      case SortType.DEFAULT:
        orders.sort((a, b) => b.createAt - a.createAt);
        break;
      case SortType.OLDEST:
        orders.sort((a, b) => a.createAt - b.createAt);
        break;
      case SortType.ASCENT:
        orders.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      case SortType.DECENT:
        orders.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
      default:
        break;
    }
    return orders;
  }

  getListByLimit(orders: OrderList[], index: number, limit: number) {
    const leng = orders.length;
    let startIndex = (index - 1) * limit;
    let endIndex = index * limit;
    if (startIndex >= leng) {
      startIndex = (Math.floor(leng / startIndex) - 1) * index;
      endIndex = Math.floor(leng / startIndex) * index;
    }
    const result = orders.slice(startIndex, endIndex);
    for (let i = 0; i < result.length; i++) {
      result[i].ordinalNum = startIndex + 1;
      startIndex++;
    }
    return result;
  }

  async getOrderList(
    index: number,
    limit: number,
    sort: string,
    status: string,
  ) {
    const allOrder = await this.getAllOrder();
    const filterResult = this.filterOrderByStatus(allOrder, status);
    const sortResult = this.sortOrder(filterResult, sort);
    const listOrder = this.getListByLimit(sortResult, index, limit);
    return {
      listOrder,
      leng: sortResult.length,
    };
  }

  async getOrderListByUserId(
    userId: number,
    index: number,
    limit: number,
    sort: string,
    status: string,
  ) {
    const listOrderByUserId = await this.orderListModel.find({ userId }).exec();
    const filterResult = this.filterOrderByStatus(listOrderByUserId, status);
    const sortResult = this.sortOrder(filterResult, sort);
    const listOrder = this.getListByLimit(sortResult, index, limit);
    return {
      listOrder,
      leng: sortResult.length,
    };
  }

  async getTotalOrderSale() {
    const allProduct = await this.getAllOrder();
    return allProduct.filter((order) => !order.isCancel);
  }

  async updateUserId({ userId, guestId }) {
    return await this.orderListModel.updateMany(
      { userId: guestId },
      { userId },
    );
  }

  async deleteOrder(id: string) {
    return this.orderListModel.findOneAndDelete({ id }).exec();
  }

  async updateOrder(id: string, data: OrderList) {
    return this.orderListModel.findOneAndUpdate({ id }, { ...data });
  }
}
