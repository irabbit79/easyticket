/**
 * This file contains the entity class for the events table.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EventEntity {
  //Event ID, auto-generated, TODO: use uuid instead of auto-incremented integer
  @PrimaryGeneratedColumn()
  id: number;

  //Event name
  @Column()
  name: string;

  //Event description
  @Column()
  desc: string;

  //Event date
  @Column()
  date: Date;

  //Number of tickets available for the event
  @Column()
  tickets: number;
}
