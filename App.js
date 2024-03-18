import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './pages/BottomNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <BottomNavigator />
    </NavigationContainer>
  );
}