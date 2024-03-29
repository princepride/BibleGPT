import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './screens/BottomNavigator';
import { ContextProvider } from './contexts/ContextProvider';
import './i18n';

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <BottomNavigator />
      </NavigationContainer>
    </ContextProvider>
  );
}