import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderEntity } from './entities/order.entity';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('orders/:id')
  async findOne(@Param('id') id: number): Promise<OrderEntity> {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  @Get('users/:userId/orders')
  async findByUser(@Param('userId') userId: number): Promise<OrderEntity[]> {
    return this.ordersService.findByUser(userId);
  }

  @Get('orders')
  async findAll(): Promise<OrderEntity[]> {
    return this.ordersService.findAll();
  }

  @Post('orders')
  async create(
    @Body('userId') userId: number,
    @Body('eventId') eventId: number,
    @Body('numberOfTickets') numberOfTickets: number,
  ): Promise<OrderEntity> {
    return this.ordersService.create(userId, eventId, numberOfTickets);
  }
}
