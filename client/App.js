import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './pages/BottomNavigator';
import { ContextProvider } from './contexts/ContextProvider';

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <BottomNavigator />
      </NavigationContainer>
    </ContextProvider>
  );
}