import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DateSelectionScreen = ({ route, navigation }) => {
  const { room } = route.params;
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const handleConfirmBooking = () => {
    Alert.alert(
      'Booking Confirmed',
      `You have selected:\nCheck-In: ${checkInDate.toLocaleDateString()}\nCheck-Out: ${checkOutDate.toLocaleDateString()}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Select Dates for {room.name}</Text>

      {/* Check-In Date Picker */}
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowCheckInPicker(true)}
      >
        <Text style={styles.dateText}>
          Check-In: {checkInDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showCheckInPicker && (
        <DateTimePicker
          value={checkInDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowCheckInPicker(false);
            if (date) setCheckInDate(date);
          }}
        />
      )}

      {/* Check-Out Date Picker */}
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowCheckOutPicker(true)}
      >
        <Text style={styles.dateText}>
          Check-Out: {checkOutDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showCheckOutPicker && (
        <DateTimePicker
          value={checkOutDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowCheckOutPicker(false);
            if (date) setCheckOutDate(date);
          }}
        />
      )}

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmBooking}
      >
        <Text style={styles.confirmText}>Confirm Booking</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
