import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './screens/BottomNavigator';
import AuthStack from './screens/AuthStack';
import { ContextProvider, useStateContext } from './contexts/ContextProvider';
import './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  const { isLoggedIn } = useStateContext();

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
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;