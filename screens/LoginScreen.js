import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = require('react-native').Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.73.137.216:8000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('token', data.access_token);
        Alert.alert('Success', 'Logged in!');
        navigation.replace('Home');
      } else {
        const data = await response.json();
        Alert.alert('Login Failed', data.detail || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={require('../assets/login_cartoon.png')}
          style={styles.banner}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#AAB8D3"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#AAB8D3"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
            <Text style={styles.loginText}>{loading ? 'Logging in...' : 'Log in'}</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            Don’t have an account?{' '}
            <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001855',
  },
  banner: {
    width: width,
    height: width * 1.1,
    marginTop: 30,
    marginBottom: 10,
  },
  form: {
    width: '90%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#0F2C54',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
  },
  loginBtn: {
    backgroundColor: '#FF6C2F',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 14,
    marginTop: 12,
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupText: {
    color: '#AAB8D3',
    fontSize: 14,
  },
  signupLink: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
});
