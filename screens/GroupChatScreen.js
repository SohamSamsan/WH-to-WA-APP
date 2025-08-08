import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function GroupChatScreen() {
  const navigation = useNavigation();

  const agents = [
    {
      name: 'AI Agent 1',
      message: 'Hey everyone! Ready to pick a movie?',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCt6amF-tJ7Y4FUjg2Ne_-k-Az2dHlB66TQGxTcHerH41_au-hSCE6-740K6_z84m-YDjF8h8cZvqACVKTszLtMOATuGfmfya7Eq-vUUUbvprMhcByA6HrKpw0Lef_XQu5rL68vASWqcNaMZxHO3sm2BLAO8TVJpIeb6PD57RSPb-NbcPm5HVSJwyss0_MmLcBt1xG9IfOHu0w3JsMoeQLr-JAjCleaQPPwNzjRkMWRRgqLMGg_-HlOlGM0Zjegsl6Ha4PTpRq2bqg',
      isSender: false,
    },
    {
      name: 'AI Agent 2',
      message: "Absolutely! I'm excited to see what we come up with.",
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBZPRsHIuVxU3XUpEyt2fY857Lv4O-aDEblj7CD7C9bmE0vfbzvNWxeJZnRNbgPSWib-sgv8tllizl20EfgE_-8K2Zns7jHr8FnPfhkDbn_jmf3haRAYZuDNaBWVfahnkASv7X9oCoPjrBD4bAwKaC8RtOOgVWyI74GOg-CA-YF29FGVCVo8hbeVFyMyI44PnRtdahXS8IxzU5VKuh8Ej7FwXGFWD1uoa7-Elt21xOUrYg2f1Zmgt_fiq1qIK3nGYzA9iJJsd6BSqs',
      isSender: true,
    },
    {
      name: 'AI Agent 3',
      message: "Me too! Let's make it a good one.",
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAlKSuNdLM198xH1R5YnrvEBvce1yFoa6yurI0ZKkPGH2-k94AFpvzBu6NjR0Y3AIntFB1bkSbJLoTZplo1SyuO4SftSCTIUYgUpprJ1dYSpG44pRXCqbdTrBJgcRyJZlVxz8rGiq3kO3wUpKqZjvVqV1k9UT5EUPgHQ8ko3A-oyLqj47Br_Y0cAySfhSD5LC--HQ3oU6RB-GQleLKJZOTP3Rhvp-cRpQNijLqo1npv03A5Ml6sbgpnF0yHAxiT72_DdysWW-cTH5k',
      isSender: false,
    },
    {
      name: 'AI Agent 4',
      message: "I'm in! Let's start the suggestion rounds.",
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCVEZzSNH43ZkH5uh1AQu3hmkchfqi_apN4GV_qi2Hm2lRz195t5ESO8bEYsntkk84O2xg6tq466b1gzj_wH8VBAhsuuqQ_iicQhYhdMeeJs7bgZbVJ6AZPXh7Z1-jPNzZBTvi2VpRbz-8WVLHKpgHHDEK0XaJR-SKY5euuJAZrfyvekjMohrg0z3G8qUMcre7-OtX9WvHyUZOs9tzB8mIXCCNwHDYrwuEcgYONhEOWdn7E22KvECi9W6engMt5ps728cEbJjvO-bw',
      isSender: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111518" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Movie Night</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Avatar Row */}
      <ScrollView
        horizontal
        contentContainerStyle={styles.avatarRow}
        showsHorizontalScrollIndicator={false}
      >
        {agents.map((a, index) => (
          <Image
            key={index}
            source={{ uri: a.image }}
            style={styles.avatar}
          />
        ))}
      </ScrollView>

      {/* Chat Messages */}
      <ScrollView style={{ flex: 1 }}>
        {agents.map((agent, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              agent.isSender ? styles.senderAlign : styles.receiverAlign,
            ]}
          >
            {!agent.isSender && (
              <Image source={{ uri: agent.image }} style={styles.bubbleAvatar} />
            )}
            <View style={styles.messageBlock}>
              <Text style={styles.name}>{agent.name}</Text>
              <Text
                style={[
                  styles.message,
                  agent.isSender
                    ? styles.senderBubble
                    : styles.receiverBubble,
                ]}
              >
                {agent.message}
              </Text>
            </View>
            {agent.isSender && (
              <Image source={{ uri: agent.image }} style={styles.bubbleAvatar} />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Suggestion Button */}
      <TouchableOpacity style={styles.suggestionButton}>
        <Text style={styles.suggestionText}>Start Suggestion Rounds</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111518',
  },
  avatarRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#fff',
  },
  messageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  senderAlign: {
    justifyContent: 'flex-end',
  },
  receiverAlign: {
    justifyContent: 'flex-start',
  },
  bubbleAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  messageBlock: {
    maxWidth: '75%',
  },
  name: {
    fontSize: 12,
    color: '#637c88',
    marginBottom: 4,
  },
  message: {
    padding: 12,
    borderRadius: 16,
    fontSize: 15,
    lineHeight: 20,
  },
  senderBubble: {
    backgroundColor: '#47b4ea',
    color: '#111518',
    textAlign: 'right',
  },
  receiverBubble: {
    backgroundColor: '#f0f3f4',
    color: '#111518',
    textAlign: 'left',
  },
  suggestionButton: {
    margin: 16,
    backgroundColor: '#47b4ea',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
  },
  suggestionText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#111518',
  },
});
