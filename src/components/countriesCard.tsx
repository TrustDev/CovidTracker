import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { CountryCaseModel } from '../model/covidModel';

interface CountriesCardProps {
  countries: CountryCaseModel[] | null,
  onClickMore: Function
}

export const CountriesCard = ({
  countries,
  onClickMore
}: CountriesCardProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.countryContainer}>
        {countries && countries.map((item, index) => (
          <View key={item.CountryISO} style={styles.countryItem}>
            <Text style={styles.countryText}>{item.Country}</Text>
            <Text style={styles.caseText}>{item.Total}</Text>
          </View>
        ))}
      </View>
      <Button title="See more" onPress={() => onClickMore()}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: ''
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countryContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    justifyContent: 'space-between',
  },
  countryItem: {    
    backgroundColor: 'white',
    marginBottom: 10,
    width: '45%',
    borderRadius: 10,
    borderColor: '#dadada',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: '#333',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
  countryText: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 16
  },
  caseText: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});
