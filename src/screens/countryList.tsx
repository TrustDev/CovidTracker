import React, { useCallback, useMemo, useState, PureComponent, memo } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { CountryCaseModel, CaseType } from '../model/covidModel';
import useSummaryStore from '../store/useSummary';

interface RenderItemProps {
  item: CountryCaseModel,
  index: number
}

interface ListItemPros {
  data: CountryCaseModel
}
class ListItem extends PureComponent<ListItemPros> {  
  constructor(props: any) {
      super(props);
      this.state = {};
  }
  render() {
    const props = this.props;
    return (
      <View style={styles.tableContainer}>
        <Text style={styles.tableCountryCell}>{props.data.Country}</Text>
        <Text style={styles.tableCell}>{props.data.Deaths}</Text>
        <Text style={styles.tableCell}>{props.data.Active}</Text>
        <Text style={styles.tableCell}>{props.data.Recovered}</Text>
      </View>
    )
  }
}
const MemoListItem = memo(ListItem);

interface CountryListProps {}

export const CountryListScreen: React.FC<CountryListProps> = () => {
  const [sortBy, setSortBy] = useState<CaseType>(CaseType.DEFAULT);
  const [query, setQuery] = useState('');  
  const countryCases = useSummaryStore(state => state.countryCases);
  const filteredCases = useMemo(() => {
    const result = countryCases?.filter(item => item.Country.search(query) != -1).sort((a, b) => {
      if (sortBy == CaseType.DEFAULT)
        return b[sortBy] > a[sortBy] ? -1 : 1;
      return b[sortBy] - a[sortBy];
    });
    return result;
  }, [countryCases, sortBy, query])
  const memoizedRenderItem = useCallback(({item, index}: RenderItemProps)  => renderItem({item, index}), [filteredCases]);
  const renderItem = (props : RenderItemProps) => {
    return (
      <MemoListItem data={props.item}/>
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
  const onChangeSortby = (header: CaseType) => {
    if (!header)
      setSortBy(CaseType.DEFAULT)
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
                { label: 'Deaths', value: CaseType.DEATHS },
                { label: 'Active', value: CaseType.ACTIVE },
                { label: 'Recovered', value: CaseType.RECOVERD },
            ]}
          />
        </View>
      </View>
      <FlatList
        keyExtractor={(item, index) => item.CountryISO}
        initialNumToRender={20}
        renderItem={memoizedRenderItem}
        data={filteredCases}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
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
    color: 'black',
    backgroundColor: '#dadada',
    marginTop: -5
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
