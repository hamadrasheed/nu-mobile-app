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

import { Header } from '../../components/header/header';

export const HomeListing = ({ navigation }) => {

    const rooms = [
        { id: 1, name: 'Atlantis The Palm', price: '$215', distance: '11 miles from city center', rating: '8.7 Excellent', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbY42Aa3LQiKSDfMbPn-FzFq3PMtQQTLT0Ig&s', freeWifi: true, freeCancellation: true },
        { id: 2, name: 'Sofitel Dubai Jumeirah Beach', price: '$190', distance: '12 miles from city center', rating: '9.0 Good', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbY42Aa3LQiKSDfMbPn-FzFq3PMtQQTLT0Ig&s', freeWifi: true, freeCancellation: false },
        { id: 3, name: 'Flora Al Barsha Hotel At The Mall', price: '$109', distance: '15 miles from city center', rating: '8.5 Very Good', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbY42Aa3LQiKSDfMbPn-FzFq3PMtQQTLT0Ig&s', freeWifi: true, freeCancellation: true },
      ];

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
        navigation.navigate('Listing', { roomType: data });
    };

    const onClickViewRoom = (item) => {
        navigation.navigate('RoomDetails', { room: item })
    };

    return (

        <SafeAreaView style={styles.container}>
            
            <ScrollView showsVerticalScrollIndicator={false}>

                <Header title="Lexus NU" />

                <View style={styles.bodyContainer}>
                    <View>

                        <View style={styles.cardContainer}>
                            <Text style={styles.cardTitle}>Executive Rooms</Text>
                            <TouchableOpacity  onPress={() => onClickViewAll('executive')}>
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
                        
                        <View style={styles.cardContainer}>
                            <Text style={styles.cardTitle}>Deluxe Rooms</Text>
                            <TouchableOpacity onPress={() => onClickViewAll('delux')}>
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

                        <View style={styles.cardContainer}>
                            <Text style={styles.cardTitle}>Standard Rooms</Text>
                            <TouchableOpacity onPress={() => onClickViewAll('standard')}>
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

                </View>

            </ScrollView>

        </SafeAreaView>
    );
};

