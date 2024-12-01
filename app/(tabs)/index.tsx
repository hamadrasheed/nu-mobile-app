import { View, Text, Image, StyleSheet, Platform, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@/themes/colors';

import { HomeListing } from '../../screens/home/home';
import { ListingScreen } from '../../screens/roomListing/listing';
import { RoomDetailsScreen } from '../../screens/roomDetails/room';



export default function App() {

  const Stack: any = createStackNavigator();

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home" >

        <Stack.Screen name="Home" component={HomeListing}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Listing"
          component={ListingScreen}
          options={{
            headerTitle: 'Listing',
            headerStyle: { backgroundColor: colors.BLUE },
            headerTitleStyle: { color: '#fff', fontWeight: 'bold', fontSize: 25, },
            headerStatusBarHeight: 25,
          }}
        />

        <Stack.Screen
          name="RoomDetails"
          component={RoomDetailsScreen}
          options={{
            headerTitle: 'Room Details',
            headerStyle: { backgroundColor: '#3f51b5' },
            headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
            headerStatusBarHeight: 25,
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
