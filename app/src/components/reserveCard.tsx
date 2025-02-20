/**
 * Reservation card component, displays a card with the reservation details
 * 
 */
import { homeStyles } from "../styles/homeStyles";
import { Text, View } from "react-native";
import { Reservation } from "../types/reservation";


export function ReservationCard({ reservation }: { reservation: Reservation }) {
  const date = new Date(reservation.event.date).toLocaleDateString();
  const reservationDate = new Date(reservation.createdAt).toLocaleDateString();

  return (
    <View style={homeStyles.card}>
      <Text style={homeStyles.eventName}>{reservation.event.name}</Text>
      <Text style={homeStyles.eventDesc}>{reservation.event.desc}</Text>
      <Text>Event Date: {date}</Text>
      <Text>Number of Tickets: {reservation.tickets}</Text>
      <Text style={homeStyles.reservationDate}>Reserved on: {reservationDate}</Text>
    </View>
  );
}
