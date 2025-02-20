/**
 * Ticket modal component, displays the event name, description, 
 * and number of tickets available in this event
 * 
 */
import { View, Text, TextInput, Button, Modal } from "react-native";
import { Event } from '../types/event';
import { eventsStyles } from "../styles/eventsStyles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { RootState } from "../app/store";
import { setTickets } from "../features/eventSlice";

interface TicketModalProps {
  event: Event;
  visible: boolean;
  onClose: () => void;
  onSubmit: (tickets: number) => void;
  isSubmitting?: boolean;
}

export function TicketModal({ event, visible, onClose, onSubmit, isSubmitting }: TicketModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { error, tickets } = useSelector((state: RootState) => state.events);

  // validate number of tickets and submit the order with the number of tickets selected
  const handleSubmit = () => {
    if (tickets > 0 && tickets <= event.tickets) {
      onSubmit(tickets);
    }
  };


  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={eventsStyles.modalOverlay}>
        <View style={eventsStyles.modalContent}>
          <Text style={eventsStyles.modalTitle}>{event.name}</Text>
          <Text style={eventsStyles.modalDesc}>Available Tickets: {event.tickets}</Text>
          {/* Input for the number of tickets */}
          <TextInput
            style={eventsStyles.ticketInput}
            keyboardType="numeric"
            value={tickets.toString()}
            onChangeText={(text) => {
              const value = parseInt(text);
              if (!isNaN(value)) {
                dispatch(setTickets(value));
              } else {
                dispatch(setTickets(0));
              }
            }}
            placeholder="Number of tickets"
            editable={!isSubmitting}
          />  
          {/* Error message */}
          {error && <Text style={eventsStyles.error}>{error}</Text>}
          {/* Buttons to cancel or submit the order */}
          <View style={eventsStyles.modalButtons}>
            <Button
              title="Cancel"
              onPress={onClose}
              disabled={isSubmitting}
            />
            {/* Submit button */}
            <Button
              title={isSubmitting ? "Reserving..." : "Reserve"}
              onPress={handleSubmit}
              disabled={isSubmitting || event.tickets === 0 || tickets === 0 || tickets > event.tickets}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

