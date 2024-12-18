import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, deactivateUser } from '../../../context/authSlice'; // Logout action from authSlice
import { routes } from '@/app/navigation/routes'; // Ensure routes.LOGIN is defined
import { styles } from './style';

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: any) => state.auth); // Assuming user info is in auth state

  const handleLogout = () => {
    dispatch(logout()); // Clear token and reset auth state
    navigation.navigate(routes.HOMETAB); // Redirect to home screen
  };

  const handleDeactivateAccount = () => {
    Alert.alert(
      'Deactivate Account',
      'Are you sure you want to deactivate your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Deactivate',
          style: 'destructive',
          onPress: async () => {
            try {
              Alert.alert('Account Deactivated', 'Your account has been deactivated.');
              dispatch(deactivateUser());
              dispatch(logout()); // Logout user after deactivation
              navigation.navigate(routes.HOMETAB);
            } catch (error) {
              Alert.alert('Error', 'Failed to deactivate account. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (!token) {
    // Redirect to login if user is not authenticated
    navigation.navigate(routes.LOGIN);
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.profileContainer}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{user?.firstName || 'N/A'}</Text>

        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{user?.lastName || 'N/A'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || 'N/A'}</Text>

        <Text style={styles.label}>Role:</Text>
        <Text style={styles.value}>{user?.role?.name || 'N/A'}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {user?.role?.slug == 'guest' && (
        <TouchableOpacity style={styles.deactivateButton} onPress={handleDeactivateAccount}>
          <Text style={styles.deactivateText}>Deactivate Account</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileScreen;
