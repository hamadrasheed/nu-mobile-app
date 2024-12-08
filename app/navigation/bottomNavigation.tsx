import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import moduleName from '../screens';
import { routes } from '../../app/navigation/routes'; // Ensure this points to your routes file
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

const BottomNavBar = () => {

  const navigation: any = useNavigation();
  const { token, user } = useSelector((state: any) => state.auth);

  return (
    <View style={styles.navbar}>
      {/* Home Button */}
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(routes.HOMETAB)}>
        <Ionicons name="home-outline" size={24} color="#fff" />
        <Text style={styles.navText}>Rooms</Text>
      </TouchableOpacity>

      {!token && (
        <>
          {/* Login Button */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate(routes.LOGIN)}
          >
            <Ionicons name="log-in-outline" size={24} color="#fff" />
            <Text style={styles.navText}>Login</Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate(routes.REGISTER)} // Ensure routes.REGISTER points to your Register screen
          >
            <Ionicons name="person-add-outline" size={24} color="#fff" />
            <Text style={styles.navText}>Register</Text>
          </TouchableOpacity>
        </>
      )}

      {token && user?.role?.slug === 'guest' && (
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(routes.BOOKINGSCREEN)} // Ensure routes.MY_BOOKINGS points to your bookings screen
        >
          <Ionicons name="book-outline" size={24} color="#fff" />
          <Text style={styles.navText}>My Bookings</Text>
        </TouchableOpacity>
      )}

      {
        user?.role?.slug === 'staff' && (
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate(routes.STAFFBOOKINGSCREEN)} // Ensure routes.MY_BOOKINGS points to your bookings screen
          >
            <Ionicons name="book-outline" size={24} color="#fff" />
            <Text style={styles.navText}>Checkout Rooms</Text>
          </TouchableOpacity>
        )
      }

      {
        user?.role?.slug === 'admin' && (
          <>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate(routes.CREATEBOOKINGSCREEN)} // Ensure routes.REGISTER points to your Register screen
            >
              <Ionicons name="add" size={24} color="#fff" />
              <Text style={styles.navText}>Create Room</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate(routes.BOOKINGSCREEN)} // Ensure routes.MY_BOOKINGS points to your bookings screen
            >
              <Ionicons name="book-outline" size={24} color="#fff" />
              <Text style={styles.navText}>All Bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate(routes.REGISTER)} // Ensure routes.REGISTER points to your Register screen
            >
              <Ionicons name="person-add-outline" size={24} color="#fff" />
              <Text style={styles.navText}>Create Staff</Text>
            </TouchableOpacity>


          </>

        )
      }



    </View>
  );
};

export default BottomNavBar;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    height: 60,
    position: 'relative',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
});
