import { API_BASE_URL } from '../constants/config';
import { User } from '../types/user';

export async function createUser(name: string): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      console.log('server says' + response.statusText + ' ' + response.status);
      throw new Error(response.statusText);
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
} 

export async function resetDatabase() {
  try {
    const response = await fetch(`${API_BASE_URL}/reset-database`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
}

