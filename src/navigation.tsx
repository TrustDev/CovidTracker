import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  HomeScreen,
  CountryListScreen
} from './screens';
import { useQuery } from 'react-query'
import { fetchSummaryAndCountryStats } from './api';
import useSummaryStore from './store/useSummary';
import { GlobalAndCountrySummary } from './model/covidModel';

const { Navigator, Screen } = createNativeStackNavigator();

const Navigation = () => {
  const q = useQuery("summary", fetchSummaryAndCountryStats);
  const {setGlobalAndCountrySummary} = useSummaryStore();
  useEffect(() => {
    if (q.isSuccess)
      setGlobalAndCountrySummary(q.data as GlobalAndCountrySummary);
  }, [q.data]);

  const MainNavigator = () => (
    <Navigator>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="CountryList" component={CountryListScreen} />
    </Navigator>
  );

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
