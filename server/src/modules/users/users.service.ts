import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
  create(name: string): Promise<UserEntity> {
    return this.userRepository.save({
      name,
      createdAt: new Date(),
    });
  }
}
