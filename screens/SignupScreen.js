

// import React, { useState } from 'react';
// import LottieView from 'lottie-react-native';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   ScrollView,
//   Dimensions,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// export default function SignupScreen({ navigation }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://apijustdecide.navaacharan.com/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password }),
//       });
//       if (response.ok) {
//         Alert.alert('Success', 'Account created! Please fill out the questionnaire.');
//         navigation.replace('Questionnaire');
//       } else {
//         const data = await response.json();
//         Alert.alert('Signup Failed', data.detail || 'An error occurred');
//       }
//     } catch (error) {
//       Alert.alert('Signup Failed', 'Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <LottieView
//           source={require('../assets/ai_robot.json')}
//           autoPlay
//           loop
//           style={styles.lottie}
//         />

//         <View style={styles.form}>
//           <TextInput
//             style={styles.input}
//             placeholder="Name"
//             placeholderTextColor="#AAB8D3"
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             placeholderTextColor="#AAB8D3"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             placeholderTextColor="#AAB8D3"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />

//           <TouchableOpacity style={styles.signupBtn} onPress={handleSignup} disabled={loading}>
//             <Text style={styles.signupText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
//           </TouchableOpacity>

//           <Text style={styles.loginText}>
//             Have an account?{' '}
//             <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
//               Log in
//             </Text>
//           </Text>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingBottom: 40,
//   },
//   lottie: {
//     width: width * 0.6,
//     height: width * 0.6,
//     alignSelf: 'center',
//     marginTop: 60,
//     marginBottom: 20,
//   },
//   form: {
//     width: '90%',
//     alignSelf: 'center',
//     marginTop: 20,
//     gap: 14,
//   },
//   input: {
//     width: '100%',
//     backgroundColor: '#0F2C54',
//     borderRadius: 14,
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     color: 'white',
//     fontSize: 18,
//   },
//   signupBtn: {
//     backgroundColor: '#FF6C2F',
//     paddingVertical: 16,
//     paddingHorizontal: 60,
//     borderRadius: 20,
//     marginTop: 16,
//   },
//   signupText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   loginText: {
//     color: '#AAB8D3',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   loginLink: {
//     color: '#FFA500',
//     fontWeight: 'bold',
//   },
// });

// import React, { useState } from 'react';
// import LottieView from 'lottie-react-native';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   ScrollView,
//   Dimensions,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// export default function SignupScreen({ navigation }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://apijustdecide.navaacharan.com/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();

//         const userName = data.user?.name || name;
//         const userEmail = data.user?.email || email;
//         const userMobile = data.user?.mobile || '0000000000';

//         Alert.alert('Success', 'Account created!');

//         // ✅ Forward user info to Questionnaire
//         navigation.replace('Questionnaire', {
//           name: userName,
//           email: userEmail,
//           mobile: userMobile,
//         });
//       } else {
//         const data = await response.json();
//         Alert.alert('Signup Failed', data.detail || 'An error occurred');
//       }
//     } catch (error) {
//       Alert.alert('Signup Failed', 'Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <LottieView
//           source={require('../assets/ai_robot.json')}
//           autoPlay
//           loop
//           style={styles.lottie}
//         />

//         <View style={styles.form}>
//           <TextInput
//             style={styles.input}
//             placeholder="Name"
//             placeholderTextColor="#AAB8D3"
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             placeholderTextColor="#AAB8D3"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             placeholderTextColor="#AAB8D3"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />

//           <TouchableOpacity style={styles.signupBtn} onPress={handleSignup} disabled={loading}>
//             <Text style={styles.signupText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
//           </TouchableOpacity>

//           <Text style={styles.loginText}>
//             Have an account?{' '}
//             <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
//               Log in
//             </Text>
//           </Text>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingBottom: 40,
//   },
//   lottie: {
//     width: width * 0.6,
//     height: width * 0.6,
//     alignSelf: 'center',
//     marginTop: 60,
//     marginBottom: 20,
//   },
//   form: {
//     width: '90%',
//     alignSelf: 'center',
//     marginTop: 20,
//     gap: 14,
//   },
//   input: {
//     width: '100%',
//     backgroundColor: '#0F2C54',
//     borderRadius: 14,
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     color: 'white',
//     fontSize: 18,
//   },
//   signupBtn: {
//     backgroundColor: '#FF6C2F',
//     paddingVertical: 16,
//     paddingHorizontal: 60,
//     borderRadius: 20,
//     marginTop: 16,
//   },
//   signupText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   loginText: {
//     color: '#AAB8D3',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   loginLink: {
//     color: '#FFA500',
//     fontWeight: 'bold',
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { authAPI } from '../api';

const { width } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const result = await authAPI.signup({ name, email, password, mobile });

      if (result.ok) {
        const data = result.data;
        Alert.alert('Success', 'Account created!');

        // Store user data in AsyncStorage
        const userData = {
          name,
          email,
          mobile,
        };
        await AsyncStorage.setItem('user', JSON.stringify(userData));

        navigation.replace('Questionnaire', {
          name,
          email,
          mobile,
        });
      } else {
        Alert.alert('Signup Failed', result.data.detail || 'Something went wrong');
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Just Decide</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={goal}
              onValueChange={(itemValue) => setGoal(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select your goals" value="" color="#999" />
              <Picker.Item label="Entertainment" value="entertainment" />
              <Picker.Item label="Quality Time" value="quality_time" />
              <Picker.Item label="Movie Suggestion AI" value="ai" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.signupBtn} onPress={handleSignup} disabled={loading}>
            <Text style={styles.signupText}>{loading ? 'Registering...' : 'Register'}</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Already have account?{' '}
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30,
    color: '#111',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
  },
  pickerContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  signupBtn: {
    backgroundColor: '#2DAEFF',
    paddingVertical: 16,
    borderRadius: 10,
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginTop: 20,
  },
  footerLink: {
    color: '#2DAEFF',
    fontWeight: 'bold',
  },
});
