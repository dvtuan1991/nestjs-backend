import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { v4 as uuidv4 } from 'uuid';

export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}
  async createOrder(data: Order) {
    const findOrder = await this.orderModel.findOne({
      userId: data.userId,
      productId: data.productId,
      isNew: true
    });
    if (findOrder) {
      let quantity = findOrder.quantity + 1;
      let price = quantity * data.price;
      const result = await this.orderModel
        .findOneAndUpdate({ id: findOrder.id }, { quantity, price })
        .exec();
      // console.log(result);
      return result;
    }
    if (!findOrder) {
      const createData = new this.orderModel({
        ...data,
        id: uuidv4(),
        quantity: 1,
      });
      return createData.save();
    }
  }

  async finnd(userId: number, productId: number) {
    return this.orderModel.findOne({ userId, productId });
  }

  async updateUserId({ userId, guestId }) {
    return await this.orderModel.updateMany({ userId: guestId }, { userId });
  }

  async getOrderByUserId(userId: number, isCart: boolean = false) {
    // if (isCart) {
    //   return await this.orderModel.find({ userId, isNew: isCart });
    // }
    return await this.orderModel.find({ userId, isNew: isCart });
  }

  async getOrderByOrderListId(orderListId: string) {
    return this.orderModel.find({ orderListId }).exec();
  }

  async findOneAndUpdate(id: string, data: Order) {
    return this.orderModel.findOneAndUpdate({ id }, { ...data }).exec();
  }
}
