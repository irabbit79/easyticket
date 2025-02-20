import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EventsService } from '../events/events.service';
import { EventEntity } from '../events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, EventEntity])],
  controllers: [UsersController],
  providers: [UsersService, EventsService],
  exports: [UsersService],
})
export class UsersModule {}
