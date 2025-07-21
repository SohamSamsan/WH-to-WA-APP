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

const { width } = require('react-native').Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.73.137.216:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        Alert.alert('Success', 'Account created! Please fill out the questionnaire.');
        navigation.replace('Questionnaire');
      } else {
        const data = await response.json();
        Alert.alert('Signup Failed', data.detail || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Signup Failed', 'Network error');
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
          source={require('../assets/signup_cartoon.png')}
          style={styles.banner}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#AAB8D3"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#AAB8D3"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#AAB8D3"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.signupBtn} onPress={handleSignup} disabled={loading}>
            <Text style={styles.signupText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Have an account?{' '}
            <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              Log in
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
  signupBtn: {
    backgroundColor: '#FF6C2F',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 14,
    marginTop: 12,
    marginBottom: 20,
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#AAB8D3',
    fontSize: 14,
  },
  loginLink: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
});
