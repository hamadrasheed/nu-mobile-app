import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useSelector} from 'react-redux';
// import AuthNavigator from './';
import HomeNavigator from './HomeNavigator';
import BottomNavBar from './bottomNavigation';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  // const isLogin = useSelector(selector => selector.user.isLogin);

  return (
    <NavigationContainer>
      <HomeNavigator />
      <BottomNavBar />

      {/* {isLogin ? <HomeNavigator /> : <AuthNavigator />} */}
    </NavigationContainer>
  );
};

export default AppNavigator;
