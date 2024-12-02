import { View, Text, Image, StyleSheet, Platform, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@/themes/colors';
import LoginScreen from './login';

import { HomeListing } from '../../screens/home/home';
import { ListingScreen } from '../../screens/roomListing/listing';
import { RoomDetailsScreen } from '../../screens/roomDetails/room';

import { Provider } from 'react-redux';
import {persistStore} from 'redux-persist';
import store from '../../context/store';
import {PersistGate} from 'redux-persist/integration/react';

import AppNavigator from '../../navigation/AppNavigation';

  // export default function App() {
  //   const perStore = persistStore(store);

  //   const Stack: any = createStackNavigator();

  //   return (

  //     <Provider store={store}>
  //       <PersistGate loading={null} persistor={perStore}>

  //     {/* //   <PersistGate persistor={perStore}> */}


  //       <NavigationContainer>

  //         <Stack.Navigator initialRouteName="Home" >

  //           <Stack.Screen name="Home" component={HomeListing}
  //             options={{
  //               headerShown: false,
  //             }}
  //           />

  //           <Stack.Screen
  //             name="LoginScreen"
  //             component={LoginScreen}
  //             options={{
  //               headerTitle: 'Login',
  //               headerStyle: { backgroundColor: '#3f51b5' },
  //               headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
  //             }}
  //           />

  //           <Stack.Screen
  //             name="Listing"
  //             component={ListingScreen}
  //             options={{
  //               headerTitle: 'Listing',
  //               headerStyle: { backgroundColor: colors.BLUE },
  //               headerTitleStyle: { color: '#fff', fontWeight: 'bold', fontSize: 25, },
  //               headerStatusBarHeight: 25,
  //             }}
  //           />

  //           <Stack.Screen
  //             name="RoomDetails"
  //             component={RoomDetailsScreen}
  //             options={{
  //               headerTitle: 'Room Details',
  //               headerStyle: { backgroundColor: '#3f51b5' },
  //               headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
  //               headerStatusBarHeight: 25,
  //             }}
  //           />

  //         </Stack.Navigator>

  //       </NavigationContainer>

  //       {/* // </PersistGate> */}
  //       </PersistGate>

  //       </Provider> 

  //   );
  // }

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


///


const App = () => {

  const perStore = persistStore(store);


  return (
    <Provider store={store}>
      <PersistGate persistor={perStore}>
        <AppNavigator />
        {/* <FlashMessage position="top" /> */}
      </PersistGate>
    </Provider>
  );
};

export default App;