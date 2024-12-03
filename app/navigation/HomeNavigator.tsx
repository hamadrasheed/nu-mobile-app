import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './routes';

import Login from '../screens/login/login';

import { HomeListing } from '../screens/home/home';
import { RoomDetailsScreen } from '../screens/roomDetails/room';
import { ListingScreen } from '../screens/roomListing/listing';

const Stack: any = createNativeStackNavigator();

const HomeNavigator = () => {
  console.log('HIT in home nav');
    return (
    <Stack.Navigator screenOptions={{headerShown: false}}>

      <Stack.Screen name={routes.HOMETAB} component={HomeListing} />
      <Stack.Screen name={routes.LOGIN} component={Login} />
      <Stack.Screen name={routes.ROOMLIST} component={ListingScreen} />
      <Stack.Screen name={routes.ROOMDETAIL} component={RoomDetailsScreen} />


    </Stack.Navigator>
  );
};

export default HomeNavigator;
