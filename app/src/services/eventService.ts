import { API_BASE_URL } from '../constants/config';
import { Event } from '../types/event';

export async function getEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const events: Event[] = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
} 