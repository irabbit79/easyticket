import { Controller, Get, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationEntity } from './entities/reservation.entity';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('users/:userId/reservations')
  async findByUser(
    @Param('userId') userId: number,
  ): Promise<ReservationEntity[]> {
    return this.reservationsService.findByUser(userId);
  }

  @Get('reservations')
  async findAll(): Promise<ReservationEntity[]> {
    return this.reservationsService.findAll();
  }
}
