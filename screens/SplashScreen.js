
// import React, { useEffect } from 'react';
// import { View, Image, StyleSheet, Dimensions } from 'react-native';

// export default function SplashScreen({ navigation }) {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace('Login');
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../assets/app_logo.png')}
//         style={styles.image}
//         resizeMode="contain"
//       />
//     </View>
//   );
// }

// const { width, height } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#001649',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: width * 0.9,
//     height: height * 0.7,
//   },
// });


import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/app_logo.png')}
        style={styles.appLogo}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/company_name.png')}
        style={styles.companyLogo}
        resizeMode="contain"
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001649',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogo: {
    width: width * 0.9,
    height: height * 0.5,
  },
  companyLogo: {
    width: width * 0.5,
    height: height * 0.08,
    marginTop: 10,
  },
});
