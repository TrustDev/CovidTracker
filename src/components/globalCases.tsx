import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import PieChart from 'react-native-pie-chart';

interface GlobalCasesProps {
  deaths: number,
  recoveris: number,
  active: number,
}

export const GlobalCases = ({
  deaths,
  active,
  recoveris,
}: GlobalCasesProps) => {
  const CaseItem = (props : {label: string, value: number, color: string}) => {
    return (
      <View style={styles.countryItem}>
        <Text style={[styles.countryText, {color: props.color}]}>{props.label}</Text>
        <Text style={[styles.caseText, {color: props.color}]}>{props.value}</Text>
      </View>
    )
  }
  const widthAndHeight = 160
  const series = [deaths, recoveris, active]
  const sliceColor = ['#F44336','#2196F3','#4CAF50']
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Global Cases</Text>
      <View style={styles.contentContainer}>
        <View style={styles.countryContainer}>
          <CaseItem label="Death" color={'#F44336'} value={deaths}/>
          <CaseItem label="Recoveries" color={'#2196F3'} value={recoveris}/>
          <CaseItem label="Active Case" color={'#4CAF50'} value={active}/>
        </View>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
        />
      </View>
    </View>
  );
};
GlobalCases.defaultProps = {
  deaths: 110,
  recoveris: 50,
  active: 20
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#dadada',
    borderWidth: 1,
    shadowColor: '#333',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
  label: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  countryContainer: {
    alignContent: 'space-around',
    justifyContent: 'space-between',
  },
  countryItem: {    
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 10,
  },
  countryText: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 16
  },
  caseText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
