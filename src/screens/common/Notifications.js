import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Badge, Card, Divider, IconButton, Paragraph, Title, useTheme } from 'react-native-paper';
import { useLanguage } from '../../hooks/useLanguage';
import theme from "../../constants/Theme"
const Notifications = () => {

  const { t } = useLanguage();

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Fee Due Reminder',
      message: 'Your hostel fee for March 2024 is due. Please pay before the deadline.',
      type: 'fee',
      date: '2024-02-25',
      unread: true,
    },
    {
      id: '2',
      title: 'New Test Scheduled',
      message: 'Mathematics Unit Test scheduled for March 5th, 2024. Syllabus: Algebra and Calculus',
      type: 'academic',
      date: '2024-02-24',
      unread: true,
    },
    {
      id: '3',
      title: 'Holiday Announcement',
      message: 'Institute will remain closed on March 8th, 2024 for Holi celebration.',
      type: 'announcement',
      date: '2024-02-23',
      unread: false,
    },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'fee':
        return 'currency-inr';
      case 'academic':
        return 'book-education';
      case 'announcement':
        return 'bullhorn';
      default:
        return 'bell';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, unread: false } : notification
    ));
  };

  const renderNotification = ({ item }) => (
    <Card
      style={[styles.card, item.unread && styles.unreadCard]}
      onPress={() => markAsRead(item.id)}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <IconButton
              icon={getNotificationIcon(item.type)}
              size={24}
              color={theme.Colors.primary}
            />
            <Title style={styles.title}>{item.title}</Title>
            {item.unread && <Badge style={styles.badge}>New</Badge>}
          </View>
          <Paragraph style={styles.date}>{item.date}</Paragraph>
        </View>
        <Divider style={styles.divider} />
        <Paragraph style={styles.message}>{item.message}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 8,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  cardContent: {
    padding: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  message: {
    fontSize: 14,
    marginTop: 8,
    color: '#333',
  },
  divider: {
    marginVertical: 8,
  },
  separator: {
    height: 8,
  },
  badge: {
    marginLeft: 8,
    backgroundColor: '#007bff',
  },
});

export default Notifications;