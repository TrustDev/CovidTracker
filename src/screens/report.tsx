import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import useSummaryStore from '../store/useSummary';
import { CaseType } from '../model/covidModel';

interface ReportScreenProps {}

export const ReportScreen: React.FC<ReportScreenProps> = () => {
  const addCase = useSummaryStore(state => state.addCase);
  const countries = useSummaryStore(state => state.countryCases);  
  const [country, setCountry] = useState("");
  const [caseType, setCaseType] = useState<CaseType>(CaseType.DEFAULT);
  const countryList = useMemo(() => {
    return countries?.map(item => ({
      label: item.Country,
      value: item.CountryISO
    }))??[];
  }, [countries]);
  const onChangeCountry = (value: string) => {
    setCountry(value);
  }
  const onChangeType = (value: CaseType) => {
    setCaseType(value);
  }
  const onSubmit = () => {
    if (country == null)
      return alert("Please select country");
    if (caseType == CaseType.DEFAULT)
      return alert("Please select type of case");
    
    //passed validation
    addCase(country, caseType);
    alert("Succesfully Added");
  }

  return (
    <SafeAreaView style={styles.container}>     
      <View style={styles.pickerContainer}>    
        <RNPickerSelect
          placeholder={{          
            label: "Please select country",
            value: null
          }}
          style={{
            viewContainer: {justifyContent: 'center', flex: 1},
          }}
          onValueChange={onChangeCountry}
          items={countryList}
        />
      </View>
      <View style={styles.pickerContainer}>
        <RNPickerSelect      
          placeholder={{          
            label: "Please select type of case",            
            value: CaseType.DEFAULT
          }}
          style={{
            viewContainer: {justifyContent: 'center', flex: 1},
          }}
          onValueChange={onChangeType}
          items={[
              { label: 'Deaths', value: CaseType.DEATHS },
              { label: 'Active', value: CaseType.ACTIVE },
              { label: 'Recovered', value: CaseType.RECOVERD },
          ]}
        />
      </View>
      <Button
        title='Submit'
        onPress={onSubmit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  pickerContainer: {
    height: 40
  },
  text: {
    margin: 2,
    fontFamily: 'Montserrat',
  },
});
