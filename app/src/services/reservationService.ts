import { API_BASE_URL } from '../constants/config';
import { Reservation } from '../types/reservation';

export async function getUserReservations(userId: string): Promise<Reservation[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/reservations`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }

    const reservations: Reservation[] = await response.json();
    return reservations;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
} 