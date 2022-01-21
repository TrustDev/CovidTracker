import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface CustomTopNavigationProps {
  leftComponent?: ReactNode;
  backButton?: boolean;
}

export const CustomTopNavigation = ({
  backButton,
}: CustomTopNavigationProps) => {

  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    height: 75,
  },
  titleContainer: {
    width: 200,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 100,
    alignItems: 'center',
  },
  avatar: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  backContainer: {
    width: 100,
    alignItems: 'center',
  },
});
