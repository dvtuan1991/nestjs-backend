import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
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

  @Put('/:orderListId/byorderlist')
  async updateCartByOrderList(
    @Param('orderListId') orderListId: string,
    @Body() data: Order,
  ) {
    return this.orderService.updateOrderStatus(orderListId, data);
  }

  @Put('/:cartId/update')
  async updateCart(@Param('cartId') cartId: string, @Body() data: Order) {
    return this.orderService.findOneAndUpdate(cartId, data);
  }

  @Get('adminanalytics')
  async getAnalyticsData() {
    return this.orderService.getAnalyticsData();
  }

  @Get('/test')
  async testResut(
    @Query('userId') userId: string,
    @Query('productId') productId: string,
  ) {
    return this.orderService.finnd(Number(userId), Number(productId));
  }

  @Get('/orderlist/:orderListId')
  async getOrderByOrderListId(@Param('orderListId') orderListId: string) {
    return this.orderService.getOrderByOrderListId(orderListId);
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

  @Delete('/:id/delete')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteOrder(id);
  }
}
