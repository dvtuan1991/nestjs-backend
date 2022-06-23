import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async createOrder(@Body() data: Order) {
    return await this.orderService.createOrder(data);
  }
}
