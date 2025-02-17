import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  /**
   * Find a single event by ID
   * @param id event ID
   * @returns event entity
   */
  async findOne(id: number): Promise<EventEntity> {
    const event = await this.eventRepository.findOne({
      where: { id: id },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  /**
   * Find all events
   * @returns array of event entities
   */
  async findAll(): Promise<EventEntity[]> {
    return this.eventRepository.find();
  }

  /**
   * Update an event
   * @param id event ID to update
   * @param event event entity with updated fields
   * @returns updated event entity
   */
  async update(id: number, event: Partial<EventEntity>): Promise<EventEntity> {
    const updatedEvent = await this.eventRepository.update(id, event);
    if (updatedEvent.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  /**
   * Added this method to add tickets to an event for testing purposes
   * @param eventId if not exists, then new event is created otherwise tickets are added to the given event
   * @param numberOfTickets number of tickets to add
   * @param newName new name of the event
   * @param newDesc new description of the event
   * @returns event entity
   */
  async addTicketsAndUpdate(
    eventId: number,
    numberOfTickets: number,
    newName: string,
    newDesc: string,
  ): Promise<EventEntity> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });
    if (!event) {
      const newEvent = this.eventRepository.save({
        tickets: numberOfTickets,
        name: newName,
        desc: newDesc,
        date: new Date(),
      });
      return newEvent;
    }
    event.tickets += numberOfTickets;
    event.name = newName;
    event.desc = newDesc;
    return this.eventRepository.save(event);
  }
}
