import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { EventEntity } from '../events/entities/event.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  /**
   * Finds a user by ID
   * @param id user ID
   * @returns user entity
   */
  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders', 'reservations'],
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  /**
   * Finds all users, for testing purposes
   * @returns array of user entities
   */
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({
      relations: ['orders', 'reservations'],
    });
  }
  /**
   * creates a new user
   * @param name user name to be created
   * @returns generated user
   */
  async create(name: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { name },
    });
    if (user) {
      return user;
    }
    if (name == 'error') {
      throw new Error('Error creating user');
    }
    return this.userRepository.save({
      name,
      createdAt: new Date(),
    });
  }

  /**
   * Reset the database
   */
  async deleteAllUsers() {
    await this.userRepository.delete({});
    await this.eventRepository.delete({});
    //add one event
    await this.eventRepository.save({
      tickets: 100,
      name: 'Test Event',
      desc: 'Test Description',
      date: new Date(),
    });
  }
}
