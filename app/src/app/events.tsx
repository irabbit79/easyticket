/**
 * Events screen, displays a list of events and allows the user to select an event and create a reservation
 * 
 */

import { View, FlatList, Text, ActivityIndicator, Alert } from 'react-native';
import { useEffect } from 'react';
import { Event } from '../types/event';
import { eventsStyles } from '../styles/eventsStyles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { OrderConfirmation } from '../components/orderConfirmation';
import { EventCard } from '../components/eventCard';
import { TicketModal } from '../components/ticketModal';
import {
  fetchEvents,
  createEventOrder,
  setSelectedEvent,
  clearOrderConfirmation,
  setError
} from '../features/eventSlice';

export default function Events() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const {
    events,
    loading,
    selectedEvent,
    isSubmitting,
    orderConfirmation
  } = useSelector((state: RootState) => state.events);

  // Fetch events
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  //Order submission handler (Submit button)
  const handleTicketSubmit = async (tickets: number) => {
    if (!currentUser || !selectedEvent) {
      dispatch(setError('No user or event selected'));
      return
    };

    // Create event order
    try {
      await dispatch(createEventOrder({
        userId: currentUser.id,
        eventId: selectedEvent.id,
        numberOfTickets: tickets,
      })).unwrap();
    } catch (error) {
      // Failed to create event order
      if (error) {
        dispatch(setError(error as string));
      } else {
        // Unknown error has occurred
        dispatch(setError('An unknown error occurred. Please try again.'));
      }
    }
  };

  // Close modal (Cancel button) 
  const handleCloseModal = () => {
    dispatch(setSelectedEvent(null));
    dispatch(setError(null));
  };

  // When an event is selected, set the selected event to update the store with the selected event
  // this is used to control the modal visibility
  const handleEventSelect = (event: Event) => {
    dispatch(setSelectedEvent(event));
  };

  // Close order confirmation (Cancel button)
  const handleCloseOrderConfirmation = () => {
    dispatch(clearOrderConfirmation());
  };

  //Show loading indicator
  if (loading) {
    return (
      <View style={eventsStyles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  //if Loading complete, show the events list
  return (
    <View style={eventsStyles.container}>
      {events.length === 0 ? (
        <Text style={eventsStyles.noEvents}>No events available</Text>
      ) : //List of events
        (
          <FlatList
            data={events}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <EventCard event={item} onSelect={(event: Event) => handleEventSelect(event)} />
            )}
            contentContainerStyle={eventsStyles.list}
          />
        )}
      {/* Modal for number of tickets selection and order submission*/}
      {selectedEvent && (
        <TicketModal
          event={selectedEvent}
          visible={true}
          onClose={handleCloseModal}
          onSubmit={handleTicketSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      {/* Info about the order confirmation */}
      {orderConfirmation && (
        <OrderConfirmation
          order={orderConfirmation.order}
          tickets={orderConfirmation.tickets}
          visible={true}
          onClose={handleCloseOrderConfirmation}
        />
      )}
    </View>
  );
}

