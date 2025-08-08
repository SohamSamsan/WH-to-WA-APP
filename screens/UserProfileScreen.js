import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfileScreen({ navigation, route }) {
  const [userData, setUserData] = useState({
    name: 'User',
    email: 'user@example.com',
    mobile: '0000000000',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  // Refresh user data when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });

    return unsubscribe;
  }, [navigation]);

  // Check if user data is passed via route params
  useEffect(() => {
    if (route.params) {
      setUserData(route.params);
    }
  }, [route.params]);

  const loadUserData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        // Validate that we have the required fields
        if (parsedUser.name && parsedUser.email) {
          setUserData(parsedUser);
        }
      }
    } catch (error) {
      console.log('Error loading user data:', error);
      // Keep default values if there's an error
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsIcon}>
          <Feather name="settings" size={24} color="#111618" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5iy7yMU4LwZXb5P7TZOEmC3wQgPssMaa3QAODbF7nX_2M2u9EqMXh_r9pPWJ3mDj9MgvdZRUj-Faej2NHk3b_6PisT7H9dKE32Ry_fiBOyPpbJHhZ72xotYiHVD7pUsTrtXB12taSNvvmur3ftQOLnA2SeruhrUwj0vfyR_VA7EB7DdK_yrjlVTTebFkqgRLuq6eDELLOQtejKDD26YdCRaV-ews5drQycpmbg0RmoBtKiJeJfptV-uCdQgNiN_GxyCv_yU10iu0',
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.username}>@{userData.email.split('@')[0]}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <Text style={styles.mobile}>{userData.mobile}</Text>
          <Text style={styles.edit}>Edit Profile</Text>
        </View>

        {/* Groups */}
        <Text style={styles.sectionTitle}>Groups</Text>
        {['Movie Night Crew', 'Weekend Watchers'].map((group, idx) => (
          <View key={idx} style={styles.groupRow}>
            <Image
              source={{
                uri:
                  idx === 0
                    ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrwTHlad14zskc94em9wfjv6Br72Ig0T6BmMgIAgjAxg9ciPspHiBQTyFksdqiI2El42qWAio0IdOXnUK7pEzm2xcx78mhn3_wf77JSVedpUU_Tvn2QBwtqu02thBMuyLFSXik5uwVCgQLByaBszv9mQ58KrPrrjim0j68nplQRa_-SnKo93PPqpx-6NrXb0dhrwxXlWiYO38zGObzNWto_mdQeZEX_ClMK932M0-AX3x8GRyFdWjrwZztdubv_DdCUrsaAJdasD8'
                    : 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3ToDaFin00NhU9T2_taTOmkygBCEtUH31mDZLnrs7ebS3jsO4tqw1iiaYT_p211b8unLgQ5SEDZBQihpO1feUQ_QqbRHInlIXg86C_4EqnpL71_n_5ztUC4guhhfIxqNZSiSXp38g6SGxpgGWMeSk_R1W0CSEFEL0aTw8FXb55CDqur8i8V3qN87p5DmuKLMAwOcUeOZPkmVrHrkFY6lIM2sJcY5TRL43ONf0JGpPDVHyZ7a6Cbie34mIRVQjfFJH3HsQHAifCeY',
              }}
              style={styles.groupAvatar}
            />
            <Text style={styles.groupName}>{group}</Text>
          </View>
        ))}

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.tags}>
          {['Action', 'Comedy', 'Sci-Fi'].map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#607c8a" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people-outline" size={24} color="#607c8a" />
          <Text style={styles.navText}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="person" size={24} color="#111618" />
          <Text style={styles.navTextActive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111618',
    flex: 1,
    textAlign: 'center',
    marginLeft: 40,
  },
  settingsIcon: {
    width: 40,
    alignItems: 'flex-end',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  profileSection: {
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111618',
    marginTop: 10,
  },
  username: {
    fontSize: 16,
    color: '#607c8a',
    marginTop: 2,
  },
  email: {
    fontSize: 14,
    color: '#607c8a',
    marginTop: 4,
  },
  mobile: {
    fontSize: 14,
    color: '#607c8a',
    marginTop: 2,
  },
  edit: {
    fontSize: 16,
    color: '#607c8a',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111618',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 10,
  },
  groupAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  groupName: {
    fontSize: 16,
    color: '#111618',
    flexShrink: 1,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
  },
  tag: {
    backgroundColor: '#f0f3f5',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    color: '#111618',
    fontWeight: '500',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#f0f3f5',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#607c8a',
  },
  navTextActive: {
    fontSize: 12,
    color: '#111618',
    fontWeight: 'bold',
  },
});
