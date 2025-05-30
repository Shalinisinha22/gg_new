import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Card, IconButton, Modal, Paragraph, Portal, Searchbar, Text, TextInput, Title, useTheme } from 'react-native-paper';
import { useLanguage } from '../../i18n/LanguageContext';
import theme from "../../constants/Theme"
const ParentMessages = () => {

  const { translations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [messageText, setMessageText] = useState('');

  // Mock data - Replace with actual API calls
  const chats = [
    {
      id: 1,
      name: 'Mr. Sharma',
      role: 'Physics Teacher',
      avatar: null,
      lastMessage: 'Regarding Physics test performance',
      timestamp: '10:30 AM',
      unread: 2,
      messages: [
        {
          id: 1,
          sender: 'teacher',
          text: 'Hello, I wanted to discuss Rahul\'s recent physics test performance.',
          timestamp: '10:25 AM',
        },
        {
          id: 2,
          sender: 'teacher',
          text: 'He has shown improvement but needs to focus more on numerical problems.',
          timestamp: '10:30 AM',
        },
      ],
    },
    {
      id: 2,
      name: 'Mrs. Gupta',
      role: 'Hostel Warden',
      avatar: null,
      lastMessage: 'Monthly hostel update',
      timestamp: '09:15 AM',
      unread: 0,
      messages: [
        {
          id: 3,
          sender: 'warden',
          text: 'Monthly hostel behavior and discipline report attached.',
          timestamp: '09:15 AM',
        },
      ],
    },
    {
      id: 3,
      name: 'Mr. Verma',
      role: 'Admin Office',
      avatar: null,
      lastMessage: 'Fee reminder',
      timestamp: 'Yesterday',
      unread: 1,
      messages: [
        {
          id: 4,
          sender: 'admin',
          text: 'Kindly clear the pending hostel fees for this month.',
          timestamp: 'Yesterday',
        },
      ],
    },
  ];

  const renderSearch = () => (
    <Searchbar
      placeholder="Search messages"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchBar}
    />
  );

  const renderChatList = () => {
    const filteredChats = chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <View style={styles.chatList}>
        {filteredChats.map((chat) => (
          <Card
            key={chat.id}
            style={styles.chatCard}
            onPress={() => {
              setSelectedChat(chat);
              setChatModalVisible(true);
            }}
          >
            <Card.Content style={styles.chatContent}>
              <View style={styles.avatarContainer}>
                <Avatar.Text
                  size={40}
                  label={chat.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                />
                {chat.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unread}</Text>
                  </View>
                )}
              </View>

              <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                  <Title style={styles.chatName}>{chat.name}</Title>
                  <Paragraph style={styles.timestamp}>{chat.timestamp}</Paragraph>
                </View>
                <View style={styles.chatSubheader}>
                  <Paragraph style={styles.role}>{chat.role}</Paragraph>
                </View>
                <Paragraph numberOfLines={1} style={styles.lastMessage}>
                  {chat.lastMessage}
                </Paragraph>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    );
  };

  const renderChatModal = () => {
    if (!selectedChat) return null;

    return (
      <Portal>
        <Modal
          visible={chatModalVisible}
          onDismiss={() => setChatModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalHeader}>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={() => setChatModalVisible(false)}
            />
            <View style={styles.modalHeaderInfo}>
              <Title>{selectedChat.name}</Title>
              <Paragraph>{selectedChat.role}</Paragraph>
            </View>
          </View>

          <ScrollView style={styles.messageList}>
            {selectedChat.messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageContainer,
                  message.sender === 'parent' ? styles.sentMessage : styles.receivedMessage,
                ]}
              >
                <Card
                  style={[
                    styles.messageCard,
                    message.sender === 'parent' ? styles.sentMessageCard : styles.receivedMessageCard,
                  ]}
                >
                  <Card.Content>
                    <Paragraph>{message.text}</Paragraph>
                    <Text style={styles.messageTime}>{message.timestamp}</Text>
                  </Card.Content>
                </Card>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              placeholder="Type a message"
              value={messageText}
              onChangeText={setMessageText}
              style={styles.input}
            />
            <IconButton
              icon="send"
              size={24}
              onPress={() => {
                if (messageText.trim()) {
                  // Handle sending message
                  setMessageText('');
                }
              }}
            />
          </View>
        </Modal>
      </Portal>
    );
  };

  return (
    <View style={styles.container}>
      {renderSearch()}
      <ScrollView>
        {renderChatList()}
      </ScrollView>
      {renderChatModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
    elevation: 4,
  },
  chatList: {
    padding: 16,
  },
  chatCard: {
    marginBottom: 8,
    elevation: 2,
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  unreadBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
  },
  chatSubheader: {
    marginTop: 2,
  },
  role: {
    fontSize: 12,
    opacity: 0.8,
  },
  lastMessage: {
    marginTop: 4,
    fontSize: 14,
    opacity: 0.8,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 0,
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalHeaderInfo: {
    marginLeft: 16,
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  sentMessage: {
    alignItems: 'flex-end',
  },
  receivedMessage: {
    alignItems: 'flex-start',
  },
  messageCard: {
    maxWidth: '80%',
  },
  sentMessageCard: {
    backgroundColor: '#e3f2fd',
  },
  receivedMessageCard: {
    backgroundColor: 'white',
  },
  messageTime: {
    fontSize: 10,
    opacity: 0.6,
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
});

export default ParentMessages;