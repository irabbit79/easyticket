/**
 * Event card component, displays an event card 
 * with the event name, description, date, and number of tickets available
 * 
 */
import { eventsStyles } from "../styles/eventsStyles";
import { Event } from '../types/event';
import { TouchableOpacity, Text } from "react-native";

export function EventCard({ event, onSelect }: { event: Event; onSelect: (event: Event) => void }) {
  const date = new Date(event.date).toLocaleDateString();

  return (
    <TouchableOpacity 
      style={eventsStyles.card} 
      onPress={() => event.tickets > 0 && onSelect(event)}
    >
      <Text style={eventsStyles.eventName}>{event.name}</Text>
      <Text style={eventsStyles.eventDesc}>{event.desc}</Text>
      <Text>Date: {date}</Text>
      {event.tickets > 0 ? (
        <Text>Available Tickets: {event.tickets}</Text>
      ) : (
        <Text style={eventsStyles.soldOut}>SOLD OUT</Text>
      )}
    </TouchableOpacity>
  );
}
