import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { styles } from './style';

export const Header = ({ title }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};


