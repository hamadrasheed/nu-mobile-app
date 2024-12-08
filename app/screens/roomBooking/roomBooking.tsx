import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Alert,
    ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { bookRoom } from '../../../context/roomSlice'; // Redux action to handle room booking
import { routes } from '@/app/navigation/routes';
import { Header } from '@/app/component/header/header';

export const RoomBookingScreen = ({ route, navigation }) => {
    const dispatch: any = useDispatch();

    // Destructure data passed via navigation
    const { room } = route.params;

    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(''); // Payment method
    const [cardDetails, setCardDetails] = useState(''); // Card number or other details

    // Calculate the number of days between check-in and check-out
    const numberOfDays = useMemo(() => {
        const checkInDate: any = new Date(room.checkInDate);
        const checkOutDate: any = new Date(room.checkOutDate);
        const diffTime = Math.abs(checkOutDate - checkInDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    }, [room.checkInDate, room.checkOutDate]);

    // Calculate the total price
    const totalPrice = useMemo(() => {
        const roomPrice = parseFloat(room.price.replace('$', '')); // Remove '$' and parse as a number
        return (roomPrice * numberOfDays).toFixed(2); // Calculate total price and keep 2 decimal places
    }, [room.price, numberOfDays]);

    const handleBooking = async () => {
        if (!paymentMethod || !cardDetails) {
            Alert.alert('Error', 'Please provide payment details.');
            return;
        }

        try {
            setLoading(true);
            const formattedCheckIn = new Date(room.checkInDate).toISOString();
            const formattedCheckOut = new Date(room.checkOutDate).toISOString();

            // Dispatch Redux action or call API directly
            await dispatch(
                bookRoom({
                    roomId: room.id,
                    checkInDate: formattedCheckIn,
                    checkOutDate: formattedCheckOut,
                    paymentVia: paymentMethod,
                    totalPaid: totalPrice,
                    totalDays: numberOfDays,
                })
            ).unwrap();

            setLoading(false);

            Alert.alert('Booking Confirmed', 'Your room has been successfully booked!');

            navigation.navigate(routes.BOOKINGSCREEN);


        } catch (error) {
            setLoading(false);
            Alert.alert('Booking Failed', error?.message || 'Failed to book the room');
        }
    };

    return (
        <>
            <Header title="Lexus NU" />
            <SafeAreaView style={styles.container}>
                <ScrollView>

                <Text style={styles.header}>Room Booking</Text>

                {/* Room Details */}
                <View style={styles.roomDetails}>
                    <Text style={styles.label}>Room Name:</Text>
                    <Text style={styles.value}>{room.name}</Text>

                    <Text style={styles.label}>Price Per Night:</Text>
                    <Text style={styles.value}>{room.price}</Text>

                    <Text style={styles.label}>Check-In Date:</Text>
                    <Text style={styles.value}>
                        {new Date(room.checkInDate).toLocaleDateString()}{' '}
                        {new Date(room.checkInDate).toLocaleTimeString()}
                    </Text>

                    <Text style={styles.label}>Check-Out Date:</Text>
                    <Text style={styles.value}>
                        {new Date(room.checkOutDate).toLocaleDateString()}{' '}
                        {new Date(room.checkOutDate).toLocaleTimeString()}
                    </Text>

                    <Text style={styles.label}>Number of Nights:</Text>
                    <Text style={styles.value}>{numberOfDays}</Text>

                    <Text style={styles.label}>Total Price:</Text>
                    <Text style={styles.value}>${totalPrice}</Text>
                </View>

                {/* Payment Details */}
                <View style={styles.paymentDetails}>
                    <Text style={styles.label}>Payment Method:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., Credit Card, PayPal"
                        value={paymentMethod}
                        onChangeText={setPaymentMethod}
                    />

                    <Text style={styles.label}>Card Details:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter card number"
                        value={cardDetails}
                        onChangeText={setCardDetails}
                        keyboardType="numeric"
                    />
                </View>

                {/* Confirm Booking Button */}
                <TouchableOpacity
                    style={styles.bookButton}
                    onPress={handleBooking}
                    disabled={loading}
                >
                    <Text style={styles.bookButtonText}>
                        {loading ? 'Booking...' : 'Confirm Booking'}
                    </Text>
                </TouchableOpacity>

                </ScrollView>

            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    roomDetails: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
    },
    paymentDetails: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        color: '#555',
        fontWeight: '600',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    bookButton: {
        backgroundColor: '#3f51b5',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
