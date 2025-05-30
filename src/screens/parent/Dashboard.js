import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, HeaderBar } from '../../components/StyledComponents';
import { borderRadius, Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Dashboard = ({ navigation }) => {
  const { t } = useLanguage();
  const [selectedChild, setSelectedChild] = useState(0);

  const children = [
    { name: 'Sarah Doe', class: 'X-A', rollNo: '15', image: require('../../assets/student-avatar.svg') },
    { name: 'James Doe', class: 'VIII-B', rollNo: '22', image: require('../../assets/student-avatar.svg') },
  ];

  const childStats = [
    { label: t('attendance'), value: '92%', icon: 'calendar-check', color: '#4CAF50' },
    { label: t('avgScore'), value: '85%', icon: 'chart-line', color: '#2196F3' },
    { label: t('rank'), value: '5', icon: 'trophy', color: '#FFC107' },
    { label: t('dueAmount'), value: '₹2000', icon: 'cash', color: '#F44336' },
  ];

  const quickActions = [
    { title: t('viewAttendance'), icon: 'calendar-check', screen: 'Attendance' },
    { title: t('viewResults'), icon: 'chart-box', screen: 'Results' },
    { title: t('payFees'), icon: 'cash', screen: 'Fees' },
    { title: t('schedule'), icon: 'calendar-clock', screen: 'Schedule' },
    { title: t('communication'), icon: 'message', screen: 'Communication' },
    { title: t('leaveRequest'), icon: 'file-document-edit', screen: 'LeaveRequest' },
  ];

  const handleActionPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <HeaderBar title={t('parentDashboard')} />
      
      <ScrollView style={styles.content}>
        <View style={styles.childSelector}>
          {children.map((child, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedChild(index)}
              style={[styles.childCard, selectedChild === index && styles.selectedChildCard]}
            >
              <Image source={child.image} style={styles.childAvatar} />
              <View style={styles.childInfo}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.childClass}>{`${t('class')} ${child.class} | ${t('rollNo')} ${child.rollNo}`}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsGrid}>
          {childStats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <MaterialCommunityIcons
                name={stat.icon}
                size={24}
                color={stat.color}
              />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => handleActionPress(action.screen)}
            >
              <Card style={styles.actionCardInner}>
                <MaterialCommunityIcons
                  name={action.icon}
                  size={28}
                  color={Colors.primary}
                />
                <Text style={styles.actionTitle}>{action.title}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <Card style={styles.announcementCard}>
          <Text style={styles.cardTitle}>{t('announcements')}</Text>
          <View style={styles.announcement}>
            <MaterialCommunityIcons name="bullhorn" size={20} color={Colors.primary} />
            <Text style={styles.announcementText}>
              {t('sampleAnnouncement')}
            </Text>
          </View>
        </Card>

        <Card style={styles.eventsCard}>
          <Text style={styles.cardTitle}>{t('upcomingEvents')}</Text>
          <View style={styles.event}>
            <MaterialCommunityIcons name="calendar" size={20} color={Colors.primary} />
            <Text style={styles.eventText}>
              {t('sampleEvent')}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.sm,
  },
  childSelector: {
    marginBottom: spacing.md,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedChildCard: {
    borderColor: Colors.primary,
  },
  childAvatar: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  childClass: {
    fontSize: 14,
    color: Colors.textLight,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statCard: {
    width: '48%',
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginVertical: spacing.xs,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  actionCard: {
    width: '31%',
    marginBottom: spacing.sm,
  },
  actionCardInner: {
    padding: spacing.sm,
    alignItems: 'center',
    aspectRatio: 1,
  },
  actionTitle: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  announcementCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  eventsCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  announcement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  announcementText: {
    flex: 1,
    marginLeft: spacing.sm,
    color: Colors.text,
  },
  event: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventText: {
    flex: 1,
    marginLeft: spacing.sm,
    color: Colors.text,
  },
});

export default Dashboard;