import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventEntity } from './entities/event.entity';

@Controller()
export class EventController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('events')
  async findAll(): Promise<EventEntity[]> {
    return this.eventsService.findAll();
  }

  @Get('event/:id')
  async findOne(@Param('id') id: number): Promise<EventEntity> {
    return this.eventsService.findOne(id);
  }

  @Post('events')
  async create(
    @Body('eventId') eventId: number,
    @Body('numberOfTickets') numberOfTickets: number,
    @Body('name') name: string,
    @Body('desc') desc: string,
  ): Promise<EventEntity> {
    return this.eventsService.addTicketsAndUpdate(
      eventId,
      numberOfTickets,
      name,
      desc,
    );
  }
}
