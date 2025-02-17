/**
 * This file defines the Order entity.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ReservationEntity } from '../../reservations/entities/reservation.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //Owner of the order, the user who made the purchase
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.order)
  reservations: ReservationEntity[];

  //Order reference, unique readable code for the order reference
  @Column({ type: 'varchar', length: 10 })
  referenceNumber: string;

  //Order creation date
  @Column()
  createdAt: Date;

  //Order status, pending, confirmed, rejected,
  //TODO: use status enum rather name magic string :D
  @Column({ default: 'pending' })
  status: string;
}
