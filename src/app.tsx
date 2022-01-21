import React from 'react';

import { enableScreens } from 'react-native-screens';

import Navigation from './navigation';

enableScreens();

const App = () => {
  return (
    <>
      <Navigation />
    </>
  );
};

export default App;
