/**
 * Home screen displays a list of reservations and a button to create a new reservation
 *
 */
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { homeStyles } from '../styles/homeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { fetchUserReservations } from '../features/reservationSlice';
import { useEffect } from 'react';
import { ReservationCard } from './../components/reserveCard';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { reservations, loading, error } = useSelector((state: RootState) => state.reservations);
  // fetch reservations for the current user
  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchUserReservations(currentUser?.id));
    }
  }, [dispatch, currentUser?.id]);
  if (loading) {
    return (
      <View style={homeStyles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      {/* Error message */}
      {error && <Text style={homeStyles.error}>{error}</Text>}
      <Text style={homeStyles.welcome}>Welcome, {currentUser?.name}!</Text>
      {reservations.length === 0 ? (
        <Text style={homeStyles.noReservations}>No reservations found</Text>
      ) : /*List of Reservations*/(
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReservationCard reservation={item} />}
          contentContainerStyle={homeStyles.list}
        />
      )}
      {/* Button to create a new reservation */}
      <TouchableOpacity
        style={homeStyles.fab}
        onPress={() => router.push('/events')}
      >
        <Text style={homeStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

