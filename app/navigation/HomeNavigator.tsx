import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './routes';

import Login from '../screens/login/login';

import { HomeListing } from '../screens/home/home';
import { RoomDetailsScreen } from '../screens/roomDetails/room';
import { ListingScreen } from '../screens/roomListing/listing';
import { RegisterPage } from '../screens/register/register';
import { DateSelectionScreen } from '../screens/roomAvailablity/roomAvailablity';

const Stack: any = createNativeStackNavigator();

const HomeNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>

      <Stack.Screen name={routes.HOMETAB} component={HomeListing} />
      <Stack.Screen name={routes.LOGIN} component={Login} />
      <Stack.Screen name={routes.REGISTER} component={RegisterPage} />
      <Stack.Screen name={routes.ROOMLIST} component={ListingScreen} />
      <Stack.Screen name={routes.ROOMDETAIL} component={RoomDetailsScreen} />
      <Stack.Screen name={routes.ROOMAVAILABLE} component={DateSelectionScreen} />


    </Stack.Navigator>
  );
};

export default HomeNavigator;
