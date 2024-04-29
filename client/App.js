import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './screens/BottomNavigator';
import AuthStack from './screens/AuthStack';
import { ContextProvider, useStateContext } from './contexts/ContextProvider';
import './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppContent = () => {
  const { isLoggedIn, setIsLoggedIn } = useStateContext();

  useEffect(() => {
    const checkToken = async () => {
      const access_token = await AsyncStorage.getItem('access_token');
      if (access_token) {
        setIsLoggedIn(true);
      }
    };
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ContextProvider>
      <AppContent />
    </ContextProvider>
  );
};

export default App;