import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import Navigation from './navigation';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
enableScreens();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
};

export default App;
