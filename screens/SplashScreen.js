


import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000); // show splash for 4 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('../assets/Animation-screen.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.title}>Just Decide</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // white background
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: width * 0.7,
    height: width * 0.7,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1aff',
    // color: '#ffffff',
    marginTop: 20,
    fontFamily: 'Plus Jakarta Sans', // optional if you use it
  },
});


// import React, { useEffect } from 'react';
// import {
//   View,
//   ImageBackground,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// export default function SplashScreen() {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace('Login');
//     }, 4000); // 4 seconds
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require('../assets/new-screen.png')} // Replace with your actual image path
//         style={styles.background}
//         resizeMode="cover"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     width: width,
//     height: height,
//   },
// });
