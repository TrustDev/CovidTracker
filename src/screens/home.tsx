import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

import { CustomTopNavigation } from '../components/topNavigation';
import { useNavigation } from '@react-navigation/native';

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <CustomTopNavigation />

      <View style={[styles.textContainer]}>
        <Text style={styles.text}>
          Hello 🎉
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
