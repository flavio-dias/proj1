import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';
console.disableYellowBox=true;

import Routes from './src/routes/index';

export default function App() {
  return (
  <NavigationContainer>
    <AuthProvider>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
      <Routes/>
    </AuthProvider>    
  </NavigationContainer>
  );
}