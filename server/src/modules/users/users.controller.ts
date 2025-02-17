import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users/:id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Get('users')
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Post('users')
  async create(@Body('name') name: string): Promise<UserEntity> {
    return this.usersService.create(name);
  }
}
