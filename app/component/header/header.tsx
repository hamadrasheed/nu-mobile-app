import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { routes } from '@/app/navigation/routes'; // Ensure this points to your routes file
import { useSelector } from 'react-redux';
import { styles } from './style';

export const Header = ({ title }) => {
  const navigation: any = useNavigation();
  const { token } = useSelector((state: any) => state.auth); // Assuming user info is in auth state

  const onClickProfile = () => {
    if(!token) {
      navigation.navigate(routes.LOGIN)
      return;
    }
    navigation.navigate(routes.PROFILESCREEN, { });
  }

  return (
    <View style={styles.header}>
      {/* Left-aligned Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right-aligned Icon */}
      <TouchableOpacity onPress={() => onClickProfile()}>
        <Ionicons name="person-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

// export default Header;


