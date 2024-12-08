import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../../../context/bookingSlice'; // Redux actions for fetching bookings
import { Header } from '@/components/header/header';
import { colors } from '@/app/themes/colors';

export const MyBookings = ({ navigation }) => {
    const dispatch = useDispatch();
    const { bookings, loading, error } = useSelector((state: any) => state.bookings);
    const { user } = useSelector((state: any) => state.auth); // Get user info from Redux

    useEffect(() => {
        dispatch(fetchUserBookings());
    }, [dispatch, user?.role?.slug]);

    const renderBooking = ({ item }) => {
        const isDisabled = item.status !== 'Booked';

        return (
            <View style={styles.card}>
                {/* Room Image */}
                <Image source={{ uri: item?.room?.image }} style={styles.image} />

                <View style={styles.info}>
                    {/* Room Details */}
                    <Text style={styles.name}>{item?.room?.name}</Text>

                    {
                        user?.role?.slug != 'guest' && (
                            <Text style={styles.detail}>Booked By: {item?.user?.firstName} {item?.user?.lastName}</Text>
                        )
                    }

                    <Text style={styles.detail}>Price: {item?.room?.price}</Text>
                    <Text style={styles.detail}>Rating: {item?.room?.rating}</Text>

                    {/* Booking Dates */}
                    <Text style={styles.date}>
                        Check-in: {new Date(item.checkInDate).toLocaleDateString()}
                    </Text>
                    <Text style={styles.date}>
                        Check-out: {new Date(item.checkOutDate).toLocaleDateString()}
                    </Text>

                    {/* Payment Details */}
                    <Text style={styles.detail}>Total Paid: ${item.totalPaid}</Text>
                    <Text style={styles.detail}>Card No. Payment via: {item.paymentVia}</Text>

                    {/* Booking Status */}
                    <Text style={styles.status}>Status: {item.status}</Text>

                    {/* Action Buttons */}
                    {user?.role?.slug !== 'admin' && (
                        <View style={styles.buttonContainer}>
                            {/* Complain Button */}
                            <TouchableOpacity
                                style={[styles.actionButton, isDisabled && styles.disabledButton]}
                                disabled={isDisabled}
                                onPress={() => {
                                    if (!isDisabled) {
                                        Alert.alert('Complain Submitted', `Booking ID: ${item.id}`);
                                    }
                                }}
                            >
                                <Text style={[styles.actionButtonText, isDisabled && styles.disabledButtonText]}>
                                    Complain
                                </Text>
                            </TouchableOpacity>

                            {/* Cancel Button */}
                            <TouchableOpacity
                                style={[styles.cancelButton, isDisabled && styles.disabledButton]}
                                disabled={isDisabled}
                                onPress={() => {
                                    if (!isDisabled) {
                                        Alert.alert('Booking Cancelled', `Booking ID: ${item.id}`);
                                    }
                                }}
                            >
                                <Text style={[styles.actionButtonText, isDisabled && styles.disabledButtonText]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3f51b5" />
                <Text style={styles.loadingText}>Loading bookings...</Text>
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

    if (!bookings || bookings.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    {user?.role?.slug === 'admin'
                        ? 'No bookings available.'
                        : 'You have no bookings.'}
                </Text>
            </View>
        );
    }

    return (
        <>
            <Header title={user?.role?.slug === 'admin' ? 'All Bookings' : 'My Bookings'} />

            <View style={styles.container}>
                <FlatList
                    data={bookings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderBooking}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </>
    );
};

export default MyBookings;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#777',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#ff0000',
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
    card: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    info: {
        padding: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detail: {
        fontSize: 14,
        marginBottom: 5,
        color: '#555',
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        color: colors.BLUE,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    actionButton: {
        backgroundColor: colors.BLUE,
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#d9534f',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    disabledButtonText: {
        color: '#999',
    },
});
