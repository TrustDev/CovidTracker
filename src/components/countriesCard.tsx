import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

interface CountriesCardProps {
  countries: string[]
}

export const CountriesCard = ({
  countries,
}: CountriesCardProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.countryContainer}>
        {countries.map((item, index) => (
          <View key={item} style={styles.countryItem}>
            <Text style={styles.countryText}>{item}</Text>
            <Text style={styles.caseText}>797</Text>
          </View>
        ))}
      </View>
      <Button title="See more"></Button>
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
