import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from '../navigation/AppNavigation';
import {store} from '../../context/store';

export default function Layout() {

  return (

    <Provider store={store}>
    {/* <PersistGate loading={null} persistor={perStore}> */}
      <AppNavigator />
    {/* </PersistGate> */}
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    height: 60,
  },
  navItem: { alignItems: 'center' },
  navText: { color: '#fff', fontSize: 12 },
});
