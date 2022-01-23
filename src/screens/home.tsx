import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { CountriesCard } from '../components/countriesCard';
import { GlobalCases } from '../components/globalCases';
import useSummaryStore from '../store/useSummary';

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = () => {
  const navigation = useNavigation();  
  const globalSummary = useSummaryStore(state => state.globalSummary);
  const countryCases = useSummaryStore(state => state.countryCases);  
  const top5CountryCases = useMemo(() => {
    return countryCases?.sort((a, b) => b.Total - a.Total).slice(0, 4)??null;
  }, [countryCases]);
  const onSeeMore = () => {
    navigation.navigate("CountryList");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.textContainer]}>
        <GlobalCases
          deaths={globalSummary?.Deaths}
          active={globalSummary?.Active}
          recoveris={globalSummary?.Recovered}
        />
        <CountriesCard
          countries={top5CountryCases}
          onClickMore={onSeeMore}
        />
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
