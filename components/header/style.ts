import { colors } from '@/themes/colors';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: colors.BLUE,
      height: 80,
      flex: 1,
    },
    headerContainer: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 28
    },
  });