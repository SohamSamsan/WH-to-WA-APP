import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    console.log("SplashScreen mounted");
    const timer = setTimeout(() => {
      console.log("Navigating to Login...");
      navigation.replace('Login'); // ✅ Swaps Splash with Login
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WH-to-WA</Text>

      <View style={styles.robotsRow}>
        <Text style={styles.robot}>🤖</Text>
        <Text style={styles.play}>▶️</Text>
        <Text style={styles.robot}>🛸</Text>
      </View>

      <View style={styles.confetti}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            style={{
              width: 8,
              height: 8,
              backgroundColor: confettiColors[i % confettiColors.length],
              position: 'absolute',
              top: Math.random() * 400 + 100,
              left: Math.random() * 300,
              transform: [{ rotate: `${Math.random() * 360}deg` }],
            }}
          />
        ))}
      </View>

      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
}

const confettiColors = ['#FF7F50', '#00FFFF', '#FFA500', '#40E0D0', '#00BFFF'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071952',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  robotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  robot: {
    fontSize: 60,
  },
  play: {
    fontSize: 40,
    color: '#FFA500',
    marginHorizontal: 10,
  },
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  loading: {
    marginTop: 40,
    fontSize: 16,
    color: '#AAB8D3',
  },
});
