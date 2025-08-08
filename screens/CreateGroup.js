import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userAPI } from '../api';

export default function CreateGroup({ navigation }) {
  const [groupName, setGroupName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const result = await userAPI.getAllUsers(token);
      if (result.ok && Array.isArray(result.data)) {
        setMembers(result.data);
      } else if (result.ok && Array.isArray(result.data.users)) {
        setMembers(result.data.users);
      } else {
        setMembers([]);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleCreateGroup = () => {
    if (groupName.trim() === '') return;
    navigation.navigate('Home', {
      newGroup: {
        name: groupName.trim(),
      },
    });
  };

  // Filter members by search query
  const filteredMembers = members.filter(
    (member) =>
      member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#181116" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Group</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <ScrollView>
        {/* Group Name Input */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Group Name"
            placeholderTextColor="#89617c"
            value={groupName}
            onChangeText={setGroupName}
            style={styles.textInput}
          />
        </View>

        {/* Member Search */}
        <Text style={styles.subheading}>Add Members</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#89617c" />
          <TextInput
            placeholder="Search for friends"
            placeholderTextColor="#89617c"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Member List */}
        {loading ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading users...</Text>
        ) : filteredMembers.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No users found.</Text>
        ) : (
          filteredMembers.map((member, index) => (
            <View key={index} style={styles.memberRow}>
              <Image source={{ uri: member.avatar || member.profilePic || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name || member.email || 'User') }} style={styles.avatar} />
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name || member.email}</Text>
                <Text style={styles.memberUsername}>{member.username ? '@' + member.username : member.email}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Create Button */}
      <View style={styles.createBtnWrapper}>
        <TouchableOpacity onPress={handleCreateGroup} style={styles.createBtn}>
          <Text style={styles.createBtnText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Spline Sans',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181116',
    flex: 1,
    textAlign: 'center',
  },
  inputBox: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  textInput: {
    backgroundColor: '#f4f0f3',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#181116',
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181116',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f4f0f3',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#181116',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  memberInfo: {
    flexDirection: 'column',
  },
  memberName: {
    fontSize: 16,
    color: '#181116',
    fontWeight: '500',
  },
  memberUsername: {
    fontSize: 14,
    color: '#89617c',
  },
  createBtnWrapper: {
    padding: 16,
    backgroundColor: '#fff',
  },
  createBtn: {
    backgroundColor: '#ef42b5',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
