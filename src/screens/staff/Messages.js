import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, HeaderBar, Input } from '../../components/StyledComponents';
import { borderRadius, Colors, shadows, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Messages = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const messages = [
    {
      id: '1',
      sender: 'Principal',
      subject: 'Staff Meeting',
      message: 'Monthly staff meeting scheduled for tomorrow at 10 AM.',
      time: '2h ago',
      unread: true,
    },
    {
      id: '2',
      sender: 'Admin Office',
      subject: 'Holiday Notice',
      message: 'School will remain closed on Monday due to local elections.',
      time: '1d ago',
      unread: false,
    },
    // Add more message items as needed
  ];

  const renderMessageItem = ({ item }) => (
    <Card style={[styles.messageCard, item.unread && styles.unreadCard]}>
      <View style={styles.messageHeader}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.subject}>{item.subject}</Text>
      <Text style={styles.messageText} numberOfLines={2}>
        {item.message}
      </Text>
      <View style={styles.messageActions}>
        <Button 
          title={t('reply')} 
          variant="secondary" 
          style={styles.actionButton}
        />
        <Button 
          title={t('delete')} 
          variant="primary" 
          style={styles.actionButton}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <HeaderBar title={t('messages')} />
      
      <View style={styles.searchContainer}>
        <Input
          placeholder={t('searchMessages')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />

      <View style={styles.fab}>
        <Button
          title="+"
          variant="primary"
          style={styles.fabButton}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    padding: spacing.sm,
    backgroundColor: Colors.cardBackground,
    ...shadows.sm,
  },
  searchInput: {
    marginBottom: 0,
  },
  messagesList: {
    padding: spacing.sm,
  },
  messageCard: {
    marginBottom: spacing.sm,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  time: {
    fontSize: 12,
    color: Colors.textLight,
  },
  subject: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  messageText: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: spacing.sm,
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  actionButton: {
    minWidth: 80,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    margin: 0,
  },
});

export default Messages;