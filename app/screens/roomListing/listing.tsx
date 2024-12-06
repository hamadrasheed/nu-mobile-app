import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsByType } from '../../../context/roomSlice'; // Import the new thunk
import { styles as customStyles } from './style';
import { Ionicons } from '@expo/vector-icons'; // For Back Icon
import { routes } from '@/app/navigation/routes';

export const ListingScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { filteredRooms, loading, error } = useSelector((state: any) => state.rooms); // Select filtered rooms from Redux store
  // console.log('filteredRooms',filteredRooms);
  const dynamicNameMapper = {
    executive: 'Executive',
    delux: 'Delux',
    standard: 'Standard',
  };
  console.log('route?.params',route?.params);
  const roomName = dynamicNameMapper[`${route?.params?.roomType}`] || 'Rooms';

  useEffect(() => {
    if (route?.params?.roomType) {
      dispatch(fetchRoomsByType(route.params.roomTypeId)); // Fetch rooms by type
    }
  }, [dispatch, route?.params?.roomType]);

  const onClickViewRoom = (item) => {
    navigation.navigate(routes.ROOMDETAIL, { room: item });
  };

  const renderRoom = ({ item }) => (
    <View style={customStyles.card}>
      <Image source={{ uri: item.image }} style={customStyles.image} />
      <View style={customStyles.info}>
        <Text style={customStyles.name}>{item.name}</Text>
        <Text style={customStyles.status}>Status: {item?.status?.name}</Text>
        <Text style={customStyles.price}>Price: {item.price}</Text>
        <TouchableOpacity style={customStyles.button} onPress={() => onClickViewRoom(item)}>
          <Text style={customStyles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3f51b5" />
        <Text style={styles.loadingText}>Loading rooms...</Text>
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

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{roomName} Rooms</Text>
      </View>

      {/* Room List */}
      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRoom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#3f51b5',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
    color: '#ff4d4d',
  },
});
