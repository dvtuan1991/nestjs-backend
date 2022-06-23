import { Body, Controller, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async createOrder(@Body() data: Order) {
    console.log("add");
    
    return await this.orderService.createOrder(data);
  }

  @Put('/updateuserid')
  async updateUserIdInCart(@Body() data: { userId; guestId }) {
    return this.orderService.updateUserId(data);
  }
}
