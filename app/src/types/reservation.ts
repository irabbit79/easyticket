import { Event } from './event';

export interface Reservation {
  id: number;
  tickets: number;
  createdAt: string;
  event: Event;
} 