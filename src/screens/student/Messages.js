import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Badge, Card, IconButton, Modal, Portal, Searchbar, Text, TextInput } from 'react-native-paper';

const StudentMessages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: '1',
      name: 'Dr. Sharma',
      role: 'Physics Teacher',
      avatar: 'S',
      lastMessage: 'Please submit your assignment by tomorrow',
      time: '2:30 PM',
      unread: 2,
    },
    {
      id: '2',
      name: 'Mr. Verma',
      role: 'Chemistry Teacher',
      avatar: 'V',
      lastMessage: 'Good work on the last test!',
      time: '11:45 AM',
      unread: 0,
    },
    {
      id: '3',
      name: 'Mrs. Gupta',
      role: 'Mathematics Teacher',
      avatar: 'G',
      lastMessage: 'Class cancelled for tomorrow',
      time: 'Yesterday',
      unread: 1,
    },
    {
      id: '4',
      name: 'Mr. Singh',
      role: 'Hostel Warden',
      avatar: 'S',
      lastMessage: 'Your room inspection is scheduled for next week',
      time: 'Yesterday',
      unread: 0,
    },
  ];

  const mockMessages = [
    {
      id: '1',
      sender: 'Dr. Sharma',
      content: 'Hello! How is your preparation going for the upcoming test?',
      time: '2:00 PM',
      isSender: false,
    },
    {
      id: '2',
      sender: 'You',
      content: 'Hello sir! It\'s going well. I\'m focusing on the quantum mechanics chapter.',
      time: '2:15 PM',
      isSender: true,
    },
    {
      id: '3',
      sender: 'Dr. Sharma',
      content: 'Good! Please submit your assignment by tomorrow.',
      time: '2:30 PM',
      isSender: false,
    },
  ];

  const handleChatPress = (chat) => {
    setSelectedChat(chat);
    setChatModalVisible(true);
  };

  const ChatItem = ({ chat }) => (
    <TouchableOpacity onPress={() => handleChatPress(chat)}>
      <Card style={styles.chatCard}>
        <View style={styles.chatContent}>
          <Avatar.Text size={50} label={chat.avatar} />
          <View style={styles.chatInfo}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.chatTime}>{chat.time}</Text>
            </View>
            <Text style={styles.chatRole}>{chat.role}</Text>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {chat.lastMessage}
            </Text>
          </View>
          {chat.unread > 0 && (
            <Badge style={styles.unreadBadge}>{chat.unread}</Badge>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search messages"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <ScrollView>
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </ScrollView>

      <Portal>
        <Modal
          visible={chatModalVisible}
          onDismiss={() => setChatModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedChat && (
            <View style={styles.chatContainer}>
              <View style={styles.chatHeader}>
                <IconButton
                  icon="arrow-left"
                  size={24}
                  onPress={() => setChatModalVisible(false)}
                />
                <Avatar.Text size={40} label={selectedChat.avatar} />
                <View style={styles.chatHeaderInfo}>
                  <Text style={styles.chatHeaderName}>{selectedChat.name}</Text>
                  <Text style={styles.chatHeaderRole}>{selectedChat.role}</Text>
                </View>
              </View>

              <ScrollView style={styles.messagesContainer}>
                {mockMessages.map((msg) => (
                  <View
                    key={msg.id}
                    style={[
                      styles.messageBox,
                      msg.isSender ? styles.sentMessage : styles.receivedMessage,
                    ]}
                  >
                    <Text style={styles.messageText}>{msg.content}</Text>
                    <Text style={styles.messageTime}>{msg.time}</Text>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  placeholder="Type a message"
                  value={message}
                  onChangeText={setMessage}
                  style={styles.input}
                />
                <IconButton
                  icon="send"
                  size={24}
                  onPress={() => {}}
                  style={styles.sendButton}
                />
              </View>
            </View>
          )}
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 16,
    borderRadius: 10,
  },
  chatCard: {
    margin: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  chatContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatRole: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  chatTime: {
    fontSize: 12,
    color: '#666666',
  },
  lastMessage: {
    fontSize: 14,
    color: '#333333',
  },
  unreadBadge: {
    backgroundColor: '#4c669f',
    position: 'absolute',
    right: 12,
    top: 12,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 0,
    padding: 0,
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  chatHeaderInfo: {
    marginLeft: 12,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatHeaderRole: {
    fontSize: 12,
    color: '#666666',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  messageBox: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  sentMessage: {
    backgroundColor: '#4c669f',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#ffffff',
  },
  sendButton: {
    backgroundColor: '#4c669f',
  },
});

export default StudentMessages;