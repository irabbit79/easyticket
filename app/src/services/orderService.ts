import { API_BASE_URL } from '../constants/config';
import { OrderResponse } from '../types/order';

interface CreateOrderParams {
  userId: string;
  eventId: number;
  numberOfTickets: number;
}

export async function createOrder(params: CreateOrderParams): Promise<OrderResponse> {

  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: params.userId,
      eventId: params.eventId,
      numberOfTickets: params.numberOfTickets,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create order');
  }

  const orderResponse: OrderResponse = await response.json();
  return orderResponse;

} 