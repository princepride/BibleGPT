import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import {register} from '../utils/connect'

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [canRegister, setCanRegister] = useState(false);
  const [canSendVerificationCode, setCanSendVerificationCode] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendVerificationCode = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Password and Confirm Password do not match.');
      return;
    }
    try {
      await axios.post('http://your-api-url/send-verification-code', { email });
      setCountdown(60);
    } catch (error) {
      console.error('Failed to send verification code:', error);
    }
  };

  const handleRegister = async () => {
    if (verificationCode.length !== 6) {
      Alert.alert('Invalid Verification Code', 'Please enter a valid 6-digit verification code.');
      return;
    }
    await register(email, password, verificationCode)
    .then(data => {
      navigation.navigate('Login');
    })
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  useEffect(() => {
    setCanRegister(
      email.length > 0 &&
        password.length > 0 &&
        confirmPassword.length > 0 &&
        verificationCode.length === 6
    );
    setCanSendVerificationCode(
      email.length > 0 &&
        password.length > 0 &&
        confirmPassword.length > 0
    );
  }, [email, password, confirmPassword, verificationCode]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        inputMode="email"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#007AFF" />
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.verificationContainer}>
        <TextInput
          style={[styles.input, styles.verificationInput]}
          placeholder="Verification Code"
          value={verificationCode}
          onChangeText={setVerificationCode}
          maxLength={6}
          inputMode="numeric"
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.verificationButton,
            !canSendVerificationCode && styles.disabledButton,
            pressed && styles.pressedButton,
            { pointerEvents: !canSendVerificationCode || countdown > 0 ? 'none' : 'auto' },
          ]}
          onPress={handleSendVerificationCode}
          disabled={!canSendVerificationCode || countdown > 0}
        >
          <Text style={[styles.buttonText, { userSelect: 'none' }]}>
            {countdown > 0 ? `Resend in ${countdown}s` : 'Send Code'}
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          canRegister ? null : styles.disabledButton,
          pressed && styles.pressedButton,
        ]}
        onPress={handleRegister}
        disabled={!canRegister}
      >
        <Text style={[styles.buttonText, { userSelect: 'none' }]}>Register</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account?</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingRight: 10,
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  verificationInput: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  verificationButton: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 15,
    marginTop: 0,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pressedButton: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
  },
});

export default RegisterPage;