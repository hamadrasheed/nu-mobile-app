import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import moduleName from '../screens';
import { routes } from '../../app/navigation/routes'; // Ensure this points to your routes file

import { useNavigation } from '@react-navigation/native';

const BottomNavBar = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.navbar}>
      {/* Home Button */}
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(routes.HOMETAB)}>
        <Ionicons name="home-outline" size={24} color="#fff" />
        <Text style={styles.navText}>Rooms</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.navItem} 
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
    position: 'absolute',
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
