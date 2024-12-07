import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Header } from '@/components/header/header';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { routes } from '@/app/navigation/routes';

export const DateSelectionScreen = ({ route, navigation }) => {

  const { room } = route.params;
  const { token } = useSelector((state: any) => state.auth);

  // Initialize dates
  const initialCheckInDate = new Date();
  initialCheckInDate.setHours(12, 0, 0, 0); // Set time to 12 PM
  const initialCheckOutDate = new Date(initialCheckInDate);
  initialCheckOutDate.setDate(initialCheckInDate.getDate() + 1); // Set check-out to next day at 11 AM
  initialCheckOutDate.setHours(11, 0, 0, 0);

  const [checkInDate, setCheckInDate] = useState(initialCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDate);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const checkRoomAvailability = async (roomId, checkInDate, checkOutDate) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/bookings/check-availability`,
        {
          roomId,
          checkInDate,
          checkOutDate,
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error checking availability';
    }
  };

  const handleConfirmBooking = async () => {

    const result = await checkRoomAvailability(room.id, checkInDate, checkOutDate);

    if (result?.data?.available) {
      navigation.navigate(routes.ROOMBOOKINGSCREEN, { room: { ...room, checkInDate, checkOutDate } });
      return;
    }

    Alert.alert(
      'Booking Unavailable',
      `Room is already booked for:\n\n${result.data.bookedDates}`
    );

  };

  const handleCheckInDateChange = (event, date) => {
    setShowCheckInPicker(false);
    if (date) {
      const newCheckInDate = new Date(date);
      newCheckInDate.setHours(12, 0, 0, 0); // Always set time to 12 PM

      const newCheckOutDate = new Date(newCheckInDate);
      newCheckOutDate.setDate(newCheckInDate.getDate() + 1); // Ensure check-out is at least 1 day later
      newCheckOutDate.setHours(11, 0, 0, 0); // Always set check-out time to 11 AM

      setCheckInDate(newCheckInDate);
      setCheckOutDate(newCheckOutDate);
    }
  };

  const handleCheckOutDateChange = (event, date) => {
    setShowCheckOutPicker(false);
    if (date) {
      const newCheckOutDate = new Date(date);
      newCheckOutDate.setHours(11, 0, 0, 0); // Always set time to 11 AM

      if (newCheckOutDate > checkInDate) {
        setCheckOutDate(newCheckOutDate);
      } else {
        Alert.alert(
          'Invalid Date',
          'Check-Out date must be at least one day after Check-In date.'
        );
      }
    }
  };

  return (
    <>
      <Header title="Lexus NU" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Select Dates for {room.name}</Text>

        {/* Check-In Date Picker */}
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowCheckInPicker(true)}
        >
          <Text style={styles.dateText}>
            Check-In: {checkInDate.toLocaleDateString()} at 12:00 PM
          </Text>
        </TouchableOpacity>
        {showCheckInPicker && (
          <DateTimePicker
            value={checkInDate}
            mode="date"
            display="default"
            onChange={handleCheckInDateChange}
          />
        )}

        {/* Check-Out Date Picker */}
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowCheckOutPicker(true)}
        >
          <Text style={styles.dateText}>
            Check-Out: {checkOutDate.toLocaleDateString()} at 11:00 AM
          </Text>
        </TouchableOpacity>
        {showCheckOutPicker && (
          <DateTimePicker
            value={checkOutDate}
            mode="date"
            display="default"
            onChange={handleCheckOutDateChange}
          />
        )}

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.confirmText}>Check Availability</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#3f51b5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
