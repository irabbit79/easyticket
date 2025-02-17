import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ReservationsModule } from '../reservations/reservations.module';
import { UsersService } from '../users/users.service';
import { EventsService } from '../events/events.service';
import { UserEntity } from '../users/entities/user.entity';
import { EventEntity } from '../events/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, UserEntity, EventEntity]),
    ReservationsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService, EventsService],
  exports: [OrdersService],
})
export class OrdersModule {}
