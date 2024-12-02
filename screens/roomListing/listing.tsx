import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { styles as customStyles } from './style';
import { Ionicons } from '@expo/vector-icons'; // For Back Icon
import { routes } from '@/navigation/routes';

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
  const onClickViewRoom = (item) => {
    navigation.navigate(routes.ROOMDETAIL, { room: item });
  };

  const dynamicNameMapper = {
    executive: 'Executive',
    delux: 'Delux',
    standard: 'Standard',
  };

  const roomName = dynamicNameMapper[`${route?.params?.roomType}`] || 'Rooms';

  const renderRoom = ({ item }) => (
    <View style={customStyles.card}>
      <Image source={{ uri: item.image }} style={customStyles.image} />
      <View style={customStyles.info}>
        <Text style={customStyles.name}>{item.name}</Text>
        <Text style={customStyles.status}>Status: {item.status}</Text>
        <Text style={customStyles.price}>Price: {item.price}</Text>
        <TouchableOpacity style={customStyles.button} onPress={() => onClickViewRoom(item)}>
          <Text style={customStyles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
        data={rooms}
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
});
