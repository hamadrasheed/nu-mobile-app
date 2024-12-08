//
import React from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { useSelector, useDispatch } from 'react-redux';
import { colors } from '@/app/themes/colors';
import { routes } from '@/app/navigation/routes';


export const RoomDetailsScreen = ({ route, navigation }) => {

  const { room } = route.params;
  const { token, user } = useSelector((state: any) => state.auth);

  const onClickCheckAvailablity = () => {
    if (!token) {
      Alert.alert('Error', 'Please you need to login first to check availablity');
      navigation.navigate(routes.LOGIN, {});
      return;
    }
    navigation.navigate(routes.ROOMAVAILABLE, { room });
  }

  return (
    <SafeAreaView style={styles.Safecontainer}>
      {/* Custom Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Room Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: room.image }} style={styles.image} />
        <Text style={styles.title}>{room.name}</Text>
        <Text style={styles.rating}>{room.rating}</Text>
        <Text style={styles.distance}>{room.distance}</Text>
        <Text style={styles.price}>Price: {room.price}</Text>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{room.description}</Text>
        <Text style={styles.sectionTitle}>Amenities</Text>
        {room.freeWifi && <Text style={styles.amenity}>✔️ Free WiFi</Text>}
        {room.freeCancellation && <Text style={styles.amenity}>✔️ Free Cancellation</Text>}
        {room.breakfastIncluded && <Text style={styles.amenity}>✔️ Free Breakfast</Text>}

        {user?.role?.slug == 'guest' && (
          <TouchableOpacity style={styles.button} onPress={() => onClickCheckAvailablity()}>
            <Text style={styles.buttonText}>Check Availablity</Text>
          </TouchableOpacity>

        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Safecontainer: {
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
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
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
  button: {
    marginTop: 10,
    backgroundColor: colors.BLUE,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
