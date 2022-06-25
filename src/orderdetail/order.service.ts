import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { v4 as uuidv4 } from 'uuid';
import { OrderStaus } from './constants';
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}
  async createOrder(data: Order) {
    const createData = new this.orderModel({ ...data, id: uuidv4() });
    return createData.save();
  }

  async updateUserId({ userId, guestId }) {
    const getCartByGuestId = await this.orderModel
      .find({ userId: guestId })
      .exec();
    const getCartByUserId = await this.orderModel.find({ userId }).exec();
    if (getCartByGuestId.length > 0) {
      return getCartByGuestId
        .map((cart) => (cart.userId = userId))
        .concat(getCartByUserId);
    }
    return getCartByUserId;
  }

  async getOrderByUserId(userId: number, isCart: boolean = false) {
    // if (isCart) {
    //   return await this.orderModel.find({ userId, isNew: isCart });
    // }
    return await this.orderModel.find({ userId, isNew: isCart });
  }
}
