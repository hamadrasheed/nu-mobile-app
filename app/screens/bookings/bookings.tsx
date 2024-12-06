// MyBookings.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../../../context/bookingSlice';
import { styles } from './style';

export const MyBookings = ({ navigation }) => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state: any) => state.bookings);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const renderBooking = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.room.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.room.name}</Text>
        <Text style={styles.date}>
          Check-in: {new Date(item.checkInDate).toLocaleDateString()}
        </Text>
        <Text style={styles.date}>
          Check-out: {new Date(item.checkOutDate).toLocaleDateString()}
        </Text>
        <Text style={styles.status}>Status: {item.status}</Text>
        {/* Add more details if needed */}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3f51b5" />
        <Text style={styles.loadingText}>Loading your bookings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (bookings.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have no bookings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBooking}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default MyBookings;
