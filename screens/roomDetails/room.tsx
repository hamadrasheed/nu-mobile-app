import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export const RoomDetailsScreen = ({ route }) => {

    const { room } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: room.image }} style={styles.image} />
            <Text style={styles.title}>{room.name}</Text>
            <Text style={styles.rating}>{room.rating}</Text>
            <Text style={styles.distance}>{room.distance}</Text>
            <Text style={styles.price}>Price: {room.price}</Text>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{room.description}</Text>
            <Text style={styles.sectionTitle}>Amenities</Text>
            {room?.amenities?.map((amenity, index) => (
                <Text key={index} style={styles.amenity}>
                    ✔️ {amenity}
                </Text>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    rating: {
        fontSize: 16,
        color: '#4caf50',
        marginBottom: 5,
    },
    distance: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    amenity: {
        fontSize: 14,
        color: '#007BFF',
    },
});
