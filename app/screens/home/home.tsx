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

import { Header } from '@/components/header/header';
import { routes } from '@/app/navigation/routes';
import { RoomsContainer } from '../../../components/roomContainer/homeContainers';

export const HomeListing = ({ navigation }) => {

    const rooms = [
        { id: 1, name: 'Atlantis The Palm', price: '$215', distance: '11 miles from city center', rating: '8.7 Excellent', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbY42Aa3LQiKSDfMbPn-FzFq3PMtQQTLT0Ig&s', freeWifi: true, freeCancellation: true },
        { id: 2, name: 'Sofitel Dubai Jumeirah Beach', price: '$190', distance: '12 miles from city center', rating: '9.0 Good', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbY42Aa3LQiKSDfMbPn-FzFq3PMtQQTLT0Ig&s', freeWifi: true, freeCancellation: false },
        { id: 3, name: 'Flora Al Barsha Hotel At The Mall', price: '$109', distance: '15 miles from city center', rating: '8.5 Very Good', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbY42Aa3LQiKSDfMbPn-FzFq3PMtQQTLT0Ig&s', freeWifi: true, freeCancellation: true },
    ];

    return (

        <SafeAreaView style={styles.container}>
            
            <ScrollView showsVerticalScrollIndicator={false}>

                <Header title="Lexus NU" />

                <View style={styles.bodyContainer}>

                    <RoomsContainer roomType='executive' roomName='Executive Rooms' rooms={rooms} navigation={navigation} />
                    <RoomsContainer roomType='delux' roomName='Deluxe Rooms' rooms={rooms} navigation={navigation} />
                    <RoomsContainer roomType='standard' roomName='Standard Rooms' rooms={rooms} navigation={navigation} />

                </View>

            </ScrollView>

        </SafeAreaView>
    );
};

