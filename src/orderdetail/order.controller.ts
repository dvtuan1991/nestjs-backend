import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async createOrder(@Body() data: Order) {
    const createData = await this.orderService.createOrder(data);
    if (createData) {
      return await this.orderService.getOrderByUserId(
        Number(data.userId),
        true,
      );
    }
  }

  @Put('/updateuserid')
  async updateUserIdInCart(@Body() data: { userId; guestId }) {
    return this.orderService.updateUserId(data);
  }

  @Put('/:cartId/update')
  async updateCart(@Param('cartId') cartId: string, @Body() data: Order) {
    return this.orderService.findOneAndUpdate(cartId, data)
  }

  @Get('/test')
  async testResut(
    @Query('userId') userId: string,
    @Query('productId') productId: string,
  ) {
    return this.orderService.finnd(Number(userId), Number(productId));
  }

  @Get('/:userId')
  async getOrderByUserId(
    @Param('userId') userId: number,
    @Query('status') status: string,
  ) {
    if (status.toLowerCase() === 'cart') {
      return this.orderService.getOrderByUserId(Number(userId), true);
    }
    return this.orderService.getOrderByUserId(Number(userId));
  }
}
