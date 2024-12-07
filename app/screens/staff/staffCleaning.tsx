import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckedOutBookings } from '../../../context/roomSlice';
import { updateBookingStatus } from '../../../context/bookingSlice';
import { Header } from '@/components/header/header';

export const StaffBookingsScreen = () => {
    const dispatch = useDispatch();
    const { checkOutRooms, loading, error } = useSelector((state: any) => state?.rooms);

    useEffect(() => {
        dispatch(fetchCheckedOutBookings({ status: 'checkedOut' }));
    }, [dispatch]);

    const handleUpdateStatus = async (bookingId, status) => {
        try {
            await dispatch(updateBookingStatus({ bookingId, status })).unwrap();
            Alert.alert('Success', `Booking status updated to "${status}"`);
            dispatch(fetchCheckedOutBookings({ status: 'checkedOut' }));
        } catch (err) {
            Alert.alert('Error', err || 'Failed to update booking status');
        }
    };

    const renderBooking = ({ item }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>{item.room?.name}</Text>
                <Text style={styles.details}>Status: {item.status}</Text>
                <Text style={styles.details}>Check-Out: {new Date(item.checkOutDate).toLocaleString()}</Text>
                <View style={styles.actions}>
                    {item?.status != 'Cleaning' && (
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#FFA500' }]} // Orange for cleaning
                        onPress={() => handleUpdateStatus(item.id, 'cleaning')}
                    >
                        <Text style={styles.buttonText}>Mark as Cleaning</Text>
                    </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#3CB371' }]} // Green for available
                        onPress={() => handleUpdateStatus(item.id, 'completed')}
                    >
                        <Text style={styles.buttonText}>Mark as Available</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    if (loading) {
        return (
            <>
            <Header title="Lexus NU" />
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3f51b5" />
                <Text style={styles.loadingText}>Loading Bookings...</Text>
            </View>
            </>
        );
    }

    if (error) {
        return (
            <>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
            </>
        );
    }

    if (!checkOutRooms || checkOutRooms?.length === 0) {
        return (
            <>
            <Header title="Lexus NU" />
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Perfect, All rooms cleaned, No new Checked Outs</Text>
            </View>
            </>
        );
    }

    return (
        <>
            <Header title="Lexus NU" />

            <FlatList
                data={checkOutRooms}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderBooking}
                contentContainerStyle={styles.listContent}
            />
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    details: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#d9534f',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#555',
    },
    listContent: {
        padding: 15, // Add padding to avoid elements being stuck to the edges
        backgroundColor: '#f8f8f8', // Light background for consistency
        flexGrow: 1, // Ensure the content stretches to fill available space
    },
});
