/**
 * This file defines the reservation entity.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderEntity } from '../../orders/entities/order.entity';
import { EventEntity } from '../../events/entities/event.entity';

@Entity()
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //User has this reservation
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  //Reserved event
  @ManyToOne(() => EventEntity)
  @JoinColumn()
  event: EventEntity;

  //Order generated this event.
  //Many reservations can be link to same order in case of transfer,
  @ManyToOne(() => OrderEntity)
  @JoinColumn()
  order: OrderEntity;

  //Number of tickets reserved
  @Column()
  tickets: number;

  //Reservation date, when this reservation was ordered/transferred
  @Column()
  createdAt: Date;
}
