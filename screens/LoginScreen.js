import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { authAPI } from '../api';

const { width, height } = Dimensions.get('window');

const COLORS = {
  bg: '#0B2A37',           // fallback background behind poster
  pillFill: '#0E3F4F',     // dark teal
  pillOutline: '#FFC82E',  // yellow outline
  cta: '#FFD339',          // button yellow
  text: '#E3F6FF',         // input text
  hint: '#6ED4FF',         // placeholder/icon cyan
  link: '#00AEEF',
  black: '#0A0A0A',
};

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const passRef = useRef(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please enter username and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await authAPI.signin({ email, password });
      if (res.ok) {
        const data = res.data ?? {};
        await AsyncStorage.setItem('token', data.access_token ?? '');
        const userData = {
          name:   data.user?.name   || 'User',
          email:  data.user?.email  || email,
          mobile: data.user?.mobile || '0000000000',
        };
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        navigation.replace('Home', userData);
      } else {
        Alert.alert('Login failed', res.data?.detail || 'Please try again.');
      }
    } catch {
      Alert.alert('Network error', 'Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Top: Poster occupies ~50–55% height */}
          <View style={styles.posterWrap}>
            <Image
              source={require('../assets/login2.png')}  // <— use your poster (the one you sent)
              style={styles.poster}
              resizeMode="contain"
            />
          </View>

          {/* Bottom: Form */}
          <View style={styles.form}>
            <View style={styles.pillRow}>
              <MaterialCommunityIcons name="account" size={22} color={COLORS.hint} style={styles.icon} />
              <TextInput
                style={styles.pillInput}
                placeholder="Username"
                placeholderTextColor={COLORS.hint}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passRef.current?.focus()}
              />
            </View>

            <View style={[styles.pillRow, { marginTop: 14 }]}>
              <MaterialCommunityIcons name="lock" size={22} color={COLORS.hint} style={styles.icon} />
              <TextInput
                ref={passRef}
                style={styles.pillInput}
                placeholder="Password"
                placeholderTextColor={COLORS.hint}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            </View>

            <TouchableOpacity style={styles.cta} onPress={handleLogin} disabled={loading}>
              <Text style={styles.ctaText}>{loading ? 'LOGGING IN…' : 'LOGIN'}</Text>
            </TouchableOpacity>

            <Text style={styles.signupRow}>
              Don’t have an account?{' '}
              <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
                Register
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PILL_H = 56;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingBottom: 24 },

  // Poster sits top→middle
  posterWrap: {
    height: height * 0.52,    // adjust 0.48–0.58 to taste
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  poster: {
    width: width,
    height: '100%',
  },

  // Form section
  form: {
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: PILL_H,
    borderRadius: 999,
    backgroundColor: COLORS.pillFill,
    borderWidth: 3,
    borderColor: COLORS.pillOutline,
    paddingHorizontal: 18,
  },
  icon: { marginRight: 10 },
  pillInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 18,
    paddingVertical: 0,
  },
  cta: {
    height: PILL_H,
    borderRadius: 18,
    backgroundColor: COLORS.cta,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.black,
    letterSpacing: 0.5,
  },
  signupRow: {
    marginTop: 14,
    textAlign: 'center',
    color: '#1D1D1D',
    fontSize: 14,
  },
  signupLink: {
    color: COLORS.link,
    fontWeight: '700',
  },
});