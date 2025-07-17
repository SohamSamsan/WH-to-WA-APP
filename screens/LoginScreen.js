import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Normally you would validate login here
    navigation.replace('Home'); // Navigate to Home after login
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>WH-to-WA</Text>

      <View style={styles.robots}>
        <Text style={styles.emoji}>🤖</Text>
        <Text style={styles.play}>▶️</Text>
        <Text style={styles.emoji}>🛸</Text>
      </View>

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

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don’t have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
          Sign up
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071952',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  robots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  emoji: {
    fontSize: 54,
    marginHorizontal: 10,
  },
  play: {
    fontSize: 36,
    color: '#FFA500',
    marginHorizontal: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#0F2C54',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
  },
  loginBtn: {
    backgroundColor: '#FF6C2F',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 24,
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
