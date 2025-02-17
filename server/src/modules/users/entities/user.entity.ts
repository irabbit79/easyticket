/**
 * This file defines the User entity.
 * User added automatically on ticket purchases.
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderEntity } from '../../orders/entities/order.entity';
import { ReservationEntity } from '../../reservations/entities/reservation.entity';

@Entity()
export class UserEntity {
  //User ID, auto-generated, TODO: use uuid instead of auto-incremented integer.
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, collation: 'NOCASE' })
  name: string;

  //User orders
  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  //User reservations
  @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
  reservations: ReservationEntity[];

  @Column()
  createdAt: Date;
}
