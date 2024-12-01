import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';

const rooms = [
    { id: 1, name: 'Deluxe Room', status: 'Available', price: '$100', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbY42Aa3LQiKSDfMbPn-FzFq3PMtQQTLT0Ig&s' },
    { id: 2, name: 'Executive Room', status: 'Cleaning', price: '$150', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Suite', status: 'Do Not Disturb', price: '$250', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Deluxe Room', status: 'Available', price: '$100', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Executive Room', status: 'Cleaning', price: '$150', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Suite', status: 'Do Not Disturb', price: '$250', image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Deluxe Room', status: 'Available', price: '$100', image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Executive Room', status: 'Cleaning', price: '$150', image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Suite', status: 'Do Not Disturb', price: '$250', image: 'https://via.placeholder.com/150' },
];

export const ListingScreen = ({ route, navigation }) => {

    const renderRoom = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>
                <Text style={styles.price}>Price: {item.price}</Text>
                <TouchableOpacity style={styles.button} onPress={() => onClickViewRoom(item)}>
                    <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const onClickViewRoom = (item) => {
        navigation.navigate('RoomDetails', { room: item })
    };


    const dynamicNameMapper = {
        executive: 'Executive',
        delux: 'Delux',
        standard: 'Standard',
    };

    const roomName = dynamicNameMapper[`${route?.params?.roomType}`] || '';

    return (
        <View style={styles.container} >
            <Text style={styles.header}>{roomName} Rooms</Text>
            <FlatList
                data={rooms}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderRoom}
            />
        </View>
    );
};


