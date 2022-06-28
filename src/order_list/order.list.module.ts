import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderListController } from "./order.list.controller";
import { OrderListService } from "./order.list.service";
import { OrderList, OrderListSchema } from "./schema/order.list";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderList.name, schema: OrderListSchema }]),
  ],
  controllers: [OrderListController],
  providers: [OrderListService],
})
export class OrderListModule {}