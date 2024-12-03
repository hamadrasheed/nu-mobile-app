import {
    Image,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';

import { routes } from '@/app/navigation/routes';

export const RoomsContainer = ({ rooms, roomName, roomType, navigation }) => {

    const renderRoom = ({ item }) => (

        <View style={styles.card}>

            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>

                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.rating}>{item.rating}</Text>
                <Text style={styles.distance}>{item.distance}</Text>
                <Text style={styles.price}>Price: {item.price}</Text>
                {item.freeWifi && <Text style={styles.amenity}>✔️ Free WiFi</Text>}
                {item.freeCancellation && <Text style={styles.amenity}>✔️ Free Cancellation</Text>}

                <TouchableOpacity style={styles.button}
                    onPress={() => onClickViewRoom(item)}
                >
                    <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const onClickViewAll = (data) => {
        navigation.navigate(routes.ROOMLIST, { roomType: data });
    };

    const onClickViewRoom = (item) => {
        navigation.navigate(routes.ROOMDETAIL, { room: item })
    };

    return (

        <View>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{roomName}</Text>
                <TouchableOpacity onPress={() => onClickViewAll(roomType)}>
                    <Text style={styles.viewButton}>View All {'>'} </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={rooms}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderRoom}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.listContainer}
            />
        </View>

    );
};

