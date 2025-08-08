

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   Modal,
//   StyleSheet,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons, Entypo } from '@expo/vector-icons';
// import { useFocusEffect } from '@react-navigation/native';

// export default function HomeScreen({ navigation, route }) {
//   const [groups, setGroups] = useState([]);
//   const [userEmail, setUserEmail] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [actionSheetVisible, setActionSheetVisible] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const user = await AsyncStorage.getItem('user');
//       if (user) {
//         const parsed = JSON.parse(user);
//         setUserEmail(parsed.email);
//         setUserData(parsed);
//         await loadGroups(parsed.email);
//       }
//     })();
//   }, []);

//   const loadGroups = async (email) => {
//     try {
//       const json = await AsyncStorage.getItem(`groups_${email}`);
//       setGroups(json ? JSON.parse(json) : []);
//     } catch (err) {
//       console.log('Error loading groups:', err);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       // Refresh user data when screen comes into focus
//       (async () => {
//         const user = await AsyncStorage.getItem('user');
//         if (user) {
//           const parsed = JSON.parse(user);
//           setUserEmail(parsed.email);
//           setUserData(parsed);
//         }
//       })();

//       const newGroup = route.params?.newGroup;
//       if (newGroup && userEmail) {
//         const addNewGroup = async () => {
//           const updated = [
//             {
//               ...newGroup,
//               id: Date.now().toString(),
//               createdBy: userEmail,
//               avatar: require('../assets/user_avatar.png'),
//               time: new Date().toLocaleTimeString(),
//               lastMessage: 'Group created!',
//             },
//             ...groups,
//           ];
//           setGroups(updated);
//           await AsyncStorage.setItem(`groups_${userEmail}`, JSON.stringify(updated));
//         };
//         addNewGroup();
//         navigation.setParams({ newGroup: null });
//       }
//     }, [route.params, userEmail])
//   );

//   const renderItem = ({ item }) => (
//     <View style={styles.groupItem}>
//       <Image source={item.avatar} style={styles.groupAvatar} />
//       <View>
//         <Text style={styles.groupName}>{item.name}</Text>
//         <Text style={styles.groupMembers}>4 members</Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Just Decide</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('UserProfile', userData)}>
//           <Ionicons name="settings-outline" size={24} color="#111518" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateGroup')}>
//           <Text style={styles.createButtonText}>Create Group</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//   style={styles.joinButton}
//   onPress={() => navigation.navigate('JoinGroup')}
// >
//   <Text style={styles.joinButtonText}>Join Group</Text>
// </TouchableOpacity>

//       </View>

//       <Text style={styles.activeTitle}>Active Groups</Text>

//       <FlatList
//         data={groups}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         ListEmptyComponent={<Text style={styles.noGroupsText}>No groups found. Tap + to create.</Text>}
//       />

//       <TouchableOpacity style={styles.fab} onPress={() => setActionSheetVisible(true)}>
//         <Ionicons name="add" size={28} color="#111518" />
//       </TouchableOpacity>

//       <View style={styles.bottomBar}>
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="home" size={22} color="#111518" />
//           <Text style={styles.navLabelActive}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="people-outline" size={22} color="#637c88" />
//           <Text style={styles.navLabel}>Groups</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="person-outline" size={22} color="#637c88" />
//           <Text style={styles.navLabel}>Profile</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal transparent visible={actionSheetVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           onPressOut={() => setActionSheetVisible(false)}
//         >
//           <View style={styles.actionBox}>
//             <Text style={styles.modalTitle}>What would you like to do?</Text>
//             <TouchableOpacity onPress={() => {
//               setActionSheetVisible(false);
//               navigation.navigate('CreateGroup');
//             }}>
//               <Text style={styles.modalAction}>➕ Create Group</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'white' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111518',
//     textAlign: 'center',
//     flex: 1,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     gap: 10,
//     paddingBottom: 10,
//   },
//   createButton: {
//     flex: 1,
//     backgroundColor: '#47b4ea',
//     borderRadius: 12,
//     height: 48,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   createButtonText: {
//     color: '#111518',
//     fontWeight: 'bold',
//   },
//   joinButton: {
//     flex: 1,
//     backgroundColor: '#f0f3f4',
//     borderRadius: 12,
//     height: 48,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   joinButtonText: {
//     color: '#111518',
//     fontWeight: 'bold',
//   },
//   activeTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111518',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//   },
//   groupItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderColor: '#f0f3f4',
//   },
//   groupAvatar: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     marginRight: 12,
//   },
//   groupName: {
//     color: '#111518',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   groupMembers: {
//     color: '#637c88',
//     fontSize: 13,
//   },
//   noGroupsText: {
//     textAlign: 'center',
//     color: '#637c88',
//     marginTop: 30,
//     fontSize: 16,
//   },
//   fab: {
//     position: 'absolute',
//     bottom: 110,
//     right: 20,
//     backgroundColor: '#47b4ea',
//     borderRadius: 28,
//     height: 56,
//     width: 56,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//     zIndex: 10,
//   },
//   bottomBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingTop: 10,
//     paddingBottom: 20,
//     borderTopWidth: 1,
//     borderColor: '#f0f3f4',
//     backgroundColor: 'white',
//   },
//   navItem: {
//     alignItems: 'center',
//     gap: 2,
//   },
//   navLabel: {
//     fontSize: 12,
//     color: '#637c88',
//   },
//   navLabelActive: {
//     fontSize: 12,
//     color: '#111518',
//     fontWeight: '500',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: '#00000066',
//   },
//   actionBox: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   modalTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   modalAction: {
//     color: '#47b4ea',
//     fontSize: 16,
//     textAlign: 'center',
//     fontWeight: '500',
//   },
// });


import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation, route }) {
  const [groups, setGroups] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [userData, setUserData] = useState(null);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsed = JSON.parse(user);
        setUserEmail(parsed.email);
        setUserData(parsed);
        await loadGroups(parsed.email);
      }
    })();       
  }, []);

  const loadGroups = async (email) => {
    try {
      const json = await AsyncStorage.getItem(`groups_${email}`);
      setGroups(json ? JSON.parse(json) : []);
    } catch (err) {
      console.log('Error loading groups:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsed = JSON.parse(user);
          setUserEmail(parsed.email);
          setUserData(parsed);
        }
      })();

      const newGroup = route.params?.newGroup;
      if (newGroup && userEmail) {
        const addNewGroup = async () => {
          const updated = [
            {
              ...newGroup,
              id: Date.now().toString(),
              createdBy: userEmail,
              avatar: require('../assets/user_avatar.png'),
              time: new Date().toLocaleTimeString(),
              lastMessage: 'Group created!',
            },
            ...groups,
          ];
          setGroups(updated);
          await AsyncStorage.setItem(`groups_${userEmail}`, JSON.stringify(updated));
        };
        addNewGroup();
        navigation.setParams({ newGroup: null });
      }
    }, [route.params, userEmail])
  );

  const renderItem = ({ item }) => (
    <View style={styles.groupItem}>
      <Image source={item.avatar} style={styles.groupAvatar} />
      <View>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.groupMembers}>4 members</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Just Decide</Text>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile', userData)}>
          <Ionicons name="settings-outline" size={24} color="#111518" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateGroup')}>
          <Text style={styles.createButtonText}>Create Group</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinButton} onPress={() => navigation.navigate('JoinGroup')}>
          <Text style={styles.joinButtonText}>Join Group</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.activeTitle}>Active Groups</Text>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noGroupsText}>No groups found. Tap + to create.</Text>}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setActionSheetVisible(true)}>
        <Ionicons name="add" size={28} color="#111518" />
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color="#111518" />
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people-outline" size={22} color="#637c88" />
          <Text style={styles.navLabel}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#637c88" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={actionSheetVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPressOut={() => setActionSheetVisible(false)}
        >
          <View style={styles.actionBox}>
            <Text style={styles.modalTitle}>What would you like to do?</Text>
            <TouchableOpacity
              onPress={() => {
                setActionSheetVisible(false);
                navigation.navigate('CreateGroup');
              }}
            >
              <Text style={styles.modalAction}>➕ Create Group</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111518',
    textAlign: 'center',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 10,
  },
  createButton: {
    flex: 1,
    backgroundColor: '#47b4ea',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#111518',
    fontWeight: 'bold',
  },
  joinButton: {
    flex: 1,
    backgroundColor: '#f0f3f4',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#111518',
    fontWeight: 'bold',
  },
  activeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111518',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f0f3f4',
  },
  groupAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  groupName: {
    color: '#111518',
    fontSize: 16,
    fontWeight: '500',
  },
  groupMembers: {
    color: '#637c88',
    fontSize: 13,
  },
  noGroupsText: {
    textAlign: 'center',
    color: '#637c88',
    marginTop: 30,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    backgroundColor: '#47b4ea',
    borderRadius: 28,
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: '#f0f3f4',
    backgroundColor: 'white',
  },
  navItem: {
    alignItems: 'center',
    gap: 2,
  },
  navLabel: {
    fontSize: 12,
    color: '#637c88',
  },
  navLabelActive: {
    fontSize: 12,
    color: '#111518',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000066',
  },
  actionBox: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalAction: {
    color: '#47b4ea',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});
