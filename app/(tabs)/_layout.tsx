import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const routes = {
  HOMETAB: '/', // Root/Home tab route
  LOGIN: 'login', // Login route
};

export default function Layout() {
  
  const router: any = useRouter();

  return (
    <View style={styles.container}>

      <Stack screenOptions={{ headerShown: false }} />

      <View style={styles.navbar}>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push(routes.HOMETAB)} // Navigates to Home
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push(routes.LOGIN)} // Navigates to Login
        >
          <Ionicons name="log-in-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Optional, to match the app's background theme
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#3f51b5', // Background color for the navbar
    position: 'absolute', // Stick to the bottom
    bottom: 0,
    width: '100%',
    height: 60, // Height of the navbar
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

