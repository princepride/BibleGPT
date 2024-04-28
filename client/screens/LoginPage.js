import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStateContext } from '../contexts/ContextProvider';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useStateContext();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://your-api-url/login', {
        username,
        password,
      });
      const { access_token } = response.data;
      await AsyncStorage.setItem('access_token', access_token);
      setIsLoggedIn(true);
      navigation.navigate('BottomNavigator');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default LoginPage;