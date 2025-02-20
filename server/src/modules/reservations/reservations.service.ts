/**
 * This file defines the ReservationsService class, which provides methods for managing reservations.
 * The service is responsible for creating reservations, finding reservations by user, and finding all reservations.
 */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { EventsService } from '../events/events.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    private readonly eventsService: EventsService,
  ) {}

  async availableTickets(eventId: number): Promise<number> {
    const event = await this.eventsService.findOne(eventId);
    return event.tickets;
  }

  /**
   * Creates a new reservation for the given user and event with the given number of tickets
   * @param userId user ID for user owning the reservation
   * @param eventId event ID
   * @param orderId order ID
   * @param numberOfTickets number of tickets to reserve
   * @returns the created reservation entity
   */
  async reserve(
    userId: number,
    eventId: number,
    orderId: number,
    numberOfTickets: number,
  ): Promise<ReservationEntity> {
    const event = await this.eventsService.findOne(eventId);

    // Check if enough tickets are available
    if (event.tickets < numberOfTickets) {
      throw new BadRequestException('Not enough tickets available');
    }

    // Create reservation
    const newReservation = this.reservationRepository.save({
      user: { id: userId },
      event: { id: eventId },
      order: { id: orderId },
      tickets: numberOfTickets,
      createdAt: new Date(),
    });

    // Update available tickets
    event.tickets -= numberOfTickets;
    await this.eventsService.update(event.id, { tickets: event.tickets });

    return newReservation;
  }

  /**
   * Finds all reservations for the given user
   * @param userId user ID
   * @returns array of reservation entities
   */
  async findByUser(userId: number): Promise<ReservationEntity[]> {
    const reservation = await this.reservationRepository.find({
      relations: ['event'],
      where: {
        user: { id: userId },
      },
    });
    if (!reservation) {
      throw new NotFoundException(
        `Reservation with user ID ${userId} not found`,
      );
    }
    return reservation;
  }

  /**
   * Finds all reservations, not used in the current implementation but could be used in the future or for testing purposes
   * @returns array of reservation entities
   */
  async findAll(): Promise<ReservationEntity[]> {
    return this.reservationRepository.find();
  }
}
