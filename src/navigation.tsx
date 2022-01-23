import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  HomeScreen,
  CountryListScreen,
  ReportScreen
} from './screens';
import { useQuery } from 'react-query'
import { fetchSummaryAndCountryStats } from './api';
import useSummaryStore from './store/useSummary';
import { GlobalAndCountrySummary } from './model/covidModel';
import { Button } from 'react-native';

const { Navigator, Screen } = createNativeStackNavigator();

const Navigation = () => {
  const q = useQuery("summary", fetchSummaryAndCountryStats);
  const setGlobalAndCountrySummary = useSummaryStore(state => state.setGlobalAndCountrySummary);
  useEffect(() => {
    if (q.isSuccess && q.data)
      setGlobalAndCountrySummary(q.data as GlobalAndCountrySummary);
  }, [q.data]);

  const MainNavigator = () => (
    <Navigator>
      <Screen
        name="Home"
        component={HomeScreen}        
        options={
          ({ navigation, route }) => ({
            headerTitle: "Main",          
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("Report")}
                title="Report"
              />
            ),
          })
        }
      />
      <Screen
        name="CountryList"
        component={CountryListScreen}        
        options={{headerTitle: "Countries List"}}
      />
      <Screen
        name="Report"
        component={ReportScreen}        
        options={{headerTitle: "Report"}}
      />
    </Navigator>
  );

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
