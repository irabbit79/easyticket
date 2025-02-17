import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { ReservationsService } from '../reservations/reservations.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly reservationsService: ReservationsService,
  ) {}

  /**
   * This method finds an order by its id
   * @param id id of the order to be found
   * @returns order entity
   */
  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'reservations'],
    });

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  /**
   * This method finds all orders made by the given user id
   * @param userId user id for which orders are being searched
   * @returns array of order entities
   */
  async findByUser(userId: number): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['reservations'],
    });
  }

  /**
   * This method finds all orders, currently used for testing purposes
   * @returns array of order entities
   */
  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      relations: ['user', 'reservations'],
    });
  }

  /**
   * This method creates an order and a reservation for a user for an event
   * The function checks if the number of tickets requested is available
   * If not, it throws an error
   * If yes, it creates the order and the reservation
   * @param userId user id making this order
   * @param eventId event id for which order is being made
   * @param numberOfTickets number of tickets to be ordered
   * @returns order entity
   */
  async create(
    userId: number,
    eventId: number,
    numberOfTickets: number,
  ): Promise<OrderEntity> {
    //create order in pending status, can be created after number of tickets creation, but we keep here to record the order
    //in case of reservation processed by another service
    const order = await this.orderRepository.save({
      user: { id: userId },
      referenceNumber: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      status: 'pending',
    });

    /**
     * Check if the number of tickets requested is available before creating the order
     * This check is not enough we need to create a lock on the reservation or use a queue to process the order
     * Another solution is it use  a database transaction lock or trigger to check the number of the tickets remaining
     */
    const availableTickets =
      await this.reservationsService.availableTickets(eventId);

    if (numberOfTickets > availableTickets) {
      throw new NotFoundException(
        `No enough tickets available, currently available tickets: ${availableTickets}`,
      );
    }

    // const savedOrder = await this.orderRepository.save(order);
    const reservations = await this.reservationsService.reserve(
      userId,
      eventId,
      order.id,
      numberOfTickets,
    );
    if (!reservations) {
      //TODO: refund order if reservations not created
      order.status = 'rejected';
      await this.orderRepository.save(order);
      throw new NotFoundException('Reservations not created');
    }
    order.status = 'confirmed';
    return this.orderRepository.save(order);
  }
}
