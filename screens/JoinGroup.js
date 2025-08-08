import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function JoinGroup({ navigation }) {
  const invitations = [
    {
      name: 'Movie Night Crew',
      from: 'Alex',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBWEcBSqA9HxShJfybFhQg-oHxMS6vUqYWRiwGgIoXQNW-rK0sa39cUNsjOv6snmYgJXaBtlk6EACkMhSUGeCBbxqh_kzD85R-AzAYYWtaUTBahXtKT4iCa24fremhy9yOU02xOsqdbbbGPv7SdE1Ukcyzh2O2q5vtvuRFgoKnvB_8MSuOrTeajWPbZvMghbM5w4XqUyV6hbeBJFtt1k3sEu-4dKloF9lnmowILLuTfqyACyxdPvlmBscAoDHnWgyyEGi3QyOo1Nok',
    },
    {
      name: 'Friday Film Club',
      from: 'Sarah',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCfkMraBJ9LrR1G2fpUYI5-eIlBrgTH6ifXU_w6xeDGMXdhX4Ka3Mm8moldzEFNH-NKmsiQQIQImWoAJjBN9rkAH37Av-sQ8muytOfboj92w9__WMkBsvA16Qmsri94NYIP8YcJH5qemnV_lz49kzuLvYGJs8Kfh1xFdLxT5sudD1X0ITFBzXWHU92pvs1rOQQuRHfPzCLRghqKfKvJkz_EGR7i2J-C5T2pOt7sYQBgehq9bYwnwf-lRCfBojO5cElGaFywfX8obSM',
    },
    {
      name: 'Weekend Watchers',
      from: 'Chris',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC5dK8ioxQtE5lWZ-O-v8KOSzadc5xng9n_N_Q3VsFE2qtP7YXMRPNYKkTLGwiCFAUP-0QSjszqo3LPXJkvKD7kfrV6OkNOYzHOjIzbYy125wQKsRY4uuMbPyQbTCW0biOmzsELvq9AcKe03OtVbTh4MJHkH0_fqAxbIwalwh1VKC6zyoTGq2aJLNvycsSTZERGN8Z2qIFDQF16tYlZt3GWPKvA1bUhtG8DeOl6ejEW2xTpAheGhxY092zORpmuAWMvCOPz4MDkIZI',
    },
  ];

  const handleAccept = (groupName) => {
    console.log(`Accepted invitation to ${groupName}`);
    // Add logic to store/join group here
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111518" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Invitations</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Invitations List */}
      <ScrollView>
        {invitations.map((invite, index) => (
          <View key={index} style={styles.inviteRow}>
            <View style={styles.inviteLeft}>
              <Image source={{ uri: invite.avatar }} style={styles.avatar} />
              <View style={styles.textWrap}>
                <Text style={styles.groupName}>{invite.name}</Text>
                <Text style={styles.groupSender}>From {invite.from}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={() => handleAccept(invite.name)}
            >
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={22} color="#637c88" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="people" size={22} color="#111518" />
          <Text style={styles.navLabelActive}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserProfile')}>
          <Ionicons name="person-outline" size={22} color="#637c88" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
    color: '#111518',
    flex: 1,
    textAlign: 'center',
  },
  inviteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f0f3f4',
  },
  inviteLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  textWrap: {
    justifyContent: 'center',
    marginLeft: 12,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111518',
  },
  groupSender: {
    fontSize: 14,
    color: '#637c88',
  },
  acceptBtn: {
    backgroundColor: '#f0f3f4',
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
  },
  acceptText: {
    fontSize: 14,
    color: '#111518',
    fontWeight: '500',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: '#f0f3f4',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#637c88',
  },
  navLabelActive: {
    fontSize: 12,
    color: '#111518',
    fontWeight: 'bold',
  },
});
