import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../../context/roomSlice'; 
import { styles } from './style';
import { Header } from '@/components/header/header';
import { RoomsContainer } from '../../../components/roomContainer/homeContainers';

export const HomeListing = ({ navigation }) => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state: any) => state.rooms);
    
  // Fetch rooms on component mount
  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  // Display loading spinner
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3f51b5" />
        <Text style={styles.loadingText}>Loading rooms...</Text>
      </View>
    );
  }

  // Handle errors
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Lexus NU" />

        <View style={styles.bodyContainer}>

        {rooms.map((roomCategory, index) => (
          <RoomsContainer
            key={index}
            roomType={roomCategory.type}
            roomTypeId = {roomCategory.id}
            roomName={roomCategory.name}
            rooms={roomCategory.data}
            navigation={navigation}
          />
        ))}

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
