import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [groups, setGroups] = useState([]);

  const [groupName, setGroupName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleCreateGroup = () => {
    const newGroup = {
      id: Date.now().toString(),
      name: groupName,
      lastMessage: `${username} created the group`,
      time: 'Now',
      avatar: require('../assets/group_avatar.png'), // default icon
    };

    setGroups([newGroup, ...groups]);
    setModalVisible(false);

    // Clear form
    setGroupName('');
    setUsername('');
    setEmail('');
    setMobile('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatCard}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.chatTop}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.chatMsg} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <View style={styles.logoTextRow}>
          <Image
            source={require('../assets/home_screen_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>WH-to-WA</Text>
        </View>
        <TouchableOpacity>
          <Entypo name="menu" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#333" style={{ marginRight: 6 }} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#333"
            style={styles.searchInput}
          />
        </View>
      </View>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 10 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No groups yet. Tap + to create one!</Text>}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Create Group</Text>

            <TextInput
              placeholder="Group Name"
              style={styles.input}
              value={groupName}
              onChangeText={setGroupName}
            />
            <TextInput
              placeholder="Your Name"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Mobile Number"
              style={styles.input}
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />

            <TouchableOpacity style={styles.createBtn} onPress={handleCreateGroup}>
              <Text style={styles.createBtnText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#001855',
  },
  topBar: {
    backgroundColor: '#001855',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  logoTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  searchRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 42,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: 'black',
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#001855',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  chatInfo: {
    flex: 1,
  },
  chatTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  chatTime: {
    fontSize: 12,
    color: 'white',
  },
  chatMsg: {
    color: 'white',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 30,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#FF3B6A',
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  plusText: {
    color: 'white',
    fontSize: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  createBtn: {
    backgroundColor: '#6A8DFE',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  createBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#555',
  },
});
