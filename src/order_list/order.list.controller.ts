import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderListService } from './order.list.service';
import { OrderList } from './schema/order.list';

@Controller('orderlist')
export class OrderListController {
  constructor(private readonly orderService: OrderListService) {}

  @Post()
  async createOrderList(@Body() data: OrderList) {
    return this.orderService.createOrderList(data);
  }

  @Put('/updateuserid')
  async updateUserIdInCart(@Body() data: { userId; guestId }) {
    console.log(data);
    return this.orderService.updateUserId(data);
  }

  @Get('/adminlist')
  async getListOrderTable(
    @Query('index') index: string,
    @Query('limit') limit: string,
    @Query('sort') sort: string,
    @Query('status') status: string,
  ) {
    return this.orderService.getOrderList(
      Number(index),
      Number(limit),
      sort,
      status,
    );
  }

  @Get('/adminstatic')
  async getTotalQuantity() {
    const totalOrderList = await this.getListOrderTable(
      '0',
      '0',
      'none',
      'none',
    );
    return totalOrderList.listOrder.filter((item) => item.isCancel).length;
  }

  @Get('/:userId')
  async getOrderListByUserId(
    @Param('userId') userId: string,
    @Query('index') index: string,
    @Query('limit') limit: string,
    @Query('sort') sort: string,
    @Query('status') status: string,
  ) {
    return this.orderService.getOrderListByUserId(
      Number(userId),
      Number(index),
      Number(limit),
      sort,
      status,
    );
  }

  @Put('/:orderId/update')
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body() data: OrderList,
  ) {
    return this.orderService.updateOrder(orderId, data);
  }

  @Delete('/:id/delete')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteOrder(id);
  }
}
