import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  HomeScreen,
} from './screens';

const { Navigator, Screen } = createNativeStackNavigator();

const Navigation = () => {

  const MainNavigator = () => (
    <Navigator>
      <Screen name="Home" component={HomeScreen} />
    </Navigator>
  );

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
