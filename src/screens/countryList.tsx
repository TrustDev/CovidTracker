import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { CountryCaseModel } from '../model/covidModel';
import useSummaryStore from '../store/useSummary';

interface CountryListProps {}
enum SortBy {
  DEFAULT = "Country",
  DEATHS = "Deaths",
  ACTIVE = "Active",
  RECOVERD = "Recovered"
}

export const CountryListScreen: React.FC<CountryListProps> = () => {
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DEFAULT);
  const [query, setQuery] = useState('');  
  const countryCases = useSummaryStore(state => state.countryCases);  
  const [caseData, setCaseData] = useState<CountryCaseModel[]>([{
    Country: 'United States',
    CountryISO: 'USA',
    Deaths: 100,
    Recovered: 50,
    Active: 10,
    Total: 10,
  }, {
    Country: 'United States',
    CountryISO: 'USA',
    Deaths: 100,
    Recovered: 50,
    Active: 10,
    Total: 10,
  }, {
    Country: 'United KingDome',
    CountryISO: 'USA',
    Deaths: 110,
    Recovered: 50,
    Active: 20,
    Total: 10,
  }, {
    Country: 'Canada',
    CountryISO: 'USA',
    Deaths: 34,
    Recovered: 52,
    Active: 11,
    Total: 10,
  }]);
  const filteredCases = useMemo(() => {
    const result = countryCases?.filter(item => item.Country.search(query) != -1).sort((a, b) => {
      if (sortBy == SortBy.DEFAULT)
        return b[sortBy] > a[sortBy] ? -1 : 1;
      return b[sortBy] - a[sortBy];
    });
    return result;
  }, [countryCases, sortBy, query])
  const renderItem = (props :{item: CountryCaseModel}) => {
    return (
      <View style={styles.tableContainer}>
        <Text style={styles.tableCountryCell}>{props.item.Country}</Text>
        <Text style={styles.tableCell}>{props.item.Deaths}</Text>
        <Text style={styles.tableCell}>{props.item.Active}</Text>
        <Text style={styles.tableCell}>{props.item.Recovered}</Text>
      </View>
    )
  }
  const renderHeader = () => {
    return (
      <View style={styles.tableContainer}>
        <Text style={[styles.tableCountryCell, styles.tableHeaderCell]}>Country</Text>
        <Text style={[styles.tableCell, styles.tableHeaderCell]}>Deaths</Text>
        <Text style={[styles.tableCell, styles.tableHeaderCell]}>Active</Text>
        <Text style={[styles.tableCell, styles.tableHeaderCell]}>Recovered</Text>
      </View>
    )
  }
  const onChangeFilter = (value: string) => {
    setQuery(value);    
  }
  const onChangeSortby = (header: SortBy) => {
    if (!header)
      setSortBy(SortBy.DEFAULT)
    else
      setSortBy(header);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.actionHeader}>
        <TextInput
          style={styles.input}
          placeholder="Please input name..."
          onChangeText={onChangeFilter}
        />
        <View style={styles.shortBy}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <RNPickerSelect
            style={{
              viewContainer: {justifyContent: 'center', flex: 1},
            }}
            onValueChange={onChangeSortby}
            items={[
                { label: 'Deaths', value: SortBy.DEATHS },
                { label: 'Active', value: SortBy.ACTIVE },
                { label: 'Recovered', value: SortBy.RECOVERD },
            ]}
          />
        </View>
      </View>
      <FlatList
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
        data={filteredCases}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 8,
  },  
  tableContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  tableCountryCell: {
    flex: 1.5
  },
  tableCell: {
    flex: 1
  },
  tableHeaderCell: {
    paddingBottom: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    color: 'black'
  },
  input: {
    height: 40,
    width: 180,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  actionHeader: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  shortBy: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  sortLabel: {
    marginRight: 0,
  },
  text: {
    margin: 2,
    fontFamily: 'Montserrat',
  },
});
