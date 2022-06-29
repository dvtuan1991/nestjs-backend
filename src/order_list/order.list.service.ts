import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderList, OrderListDocument } from './schema/order.list';
import { v4 as uuidv4 } from 'uuid';

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
  };

  async getOrderListByUserId (userId: number) {
    return this.orderListModel.find({userId}).exec();
  }
}
