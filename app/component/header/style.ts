import { colors } from '@/app/themes/colors';
import { StyleSheet } from 'react-native';


// export const styles = StyleSheet.create({
//     safeArea: {
//       backgroundColor: colors.BLUE,
//       height: 80,
//       flex: 1,
//     },
//     headerContainer: {
//       height: 60,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     headerText: {
//       color: '#fff',
//       fontSize: 30,
//       fontWeight: 'bold',
//       marginTop: 28
//     },
//   });


export const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#3f51b5',
      paddingHorizontal: 16,
      paddingVertical: 10,
      height: 60,
      marginTop: 40
    },
    title: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
        headerText: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 28
    },
  });