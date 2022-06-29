import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderListService } from './order.list.service';
import { OrderList } from './schema/order.list';

@Controller('orderlist')
export class OrderListController {
  constructor(private readonly orderService: OrderListService) {}

  @Post()
  async createOrderList(@Body() data: OrderList) {
    return this.orderService.createOrderList(data);
  }

  @Get('/:userId')
  async getOrderListByUserId(@Param('userId') userId: string) {
    return this.orderService.getOrderListByUserId(Number(userId));
  }
}
