import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import moduleName from '../screens';
import { routes } from '../../app/navigation/routes'; // Ensure this points to your routes file

import { useNavigation } from '@react-navigation/native';

const BottomNavBar = () => {
  const router: any = useRouter();
  const navigation: any = useNavigation();

  return (
    <View style={styles.navbar}>
      {/* Home Button */}
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
        <Ionicons name="home-outline" size={24} color="#fff" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.navItem} 
        onPress={() => navigation.navigate(routes.LOGIN)}
      >
        <Ionicons name="log-in-outline" size={24} color="#fff" />
        <Text style={styles.navText}>Login</Text>
      </TouchableOpacity>

      {/* Add More Buttons as Needed */}
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
