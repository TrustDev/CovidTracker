import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

import { CustomTopNavigation } from '../components/topNavigation';
import { useNavigation } from '@react-navigation/native';
import { CountriesCard } from '../components/countriesCard';
import { GlobalCases } from '../components/globalCases';

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.textContainer]}>
        <GlobalCases/>
        <CountriesCard countries={['United States', 'United Kingdom', 'Phillipines', 'South Africa', 'India']}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15
  },
  textContainer: {
    paddingVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 2,
    fontFamily: 'Montserrat',
  },
});
