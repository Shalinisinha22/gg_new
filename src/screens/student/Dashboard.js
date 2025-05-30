import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, HeaderBar } from '../../components/StyledComponents';
import Theme from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const { Colors, spacing, borderRadius } = Theme;

const Dashboard = ({ navigation }) => {
  const { t } = useLanguage();

  const stats = [
    { label: t('dashboard.attendance'), value: '85%', icon: 'calendar-check' },
    { label: t('dashboard.assignments'), value: '12/15', icon: 'file-document' },
    { label: t('dashboard.avgScore'), value: '78%', icon: 'chart-line' },
    { label: t('dashboard.rank'), value: '15', icon: 'trophy' },
  ];

  const quickActions = [
    { title: t('dashboard.viewAttendance'), icon: 'calendar-check', screen: 'Attendance' },
    { title: t('dashboard.assignments'), icon: 'book-open-variant', screen: 'Assignments' },
    { title: t('dashboard.examSchedule'), icon: 'calendar-clock', screen: 'Exams' },
    { title: t('dashboard.viewResults'), icon: 'chart-box', screen: 'Results' },
    { title: t('dashboard.payFees'), icon: 'cash', screen: 'Fees' },
    { title: t('dashboard.library'), icon: 'bookshelf', screen: 'Library' },
  ];

  const handleActionPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* <HeaderBar title={t('dashboard.title')} /> */}
      
      <ScrollView style={styles.content}>
        <Card style={styles.profileCard}>
          <Image
            // source={require('../../assets/student-avatar.svg')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.class}>Class X-A | Roll No: 15</Text>
          </View>
        </Card>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <MaterialCommunityIcons
                name={stat.icon}
                size={24}
                color={Colors.primary}
              />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{t('dashboard.quickActions')}</Text>
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
          <Text style={styles.cardTitle}>{t('dashboard.announcements')}</Text>
          <View style={styles.announcement}>
            <MaterialCommunityIcons name="bullhorn" size={20} color={Colors.primary} />
            <Text style={styles.announcementText}>
              {t('dashboard.sampleAnnouncement')}
            </Text>
          </View>
        </Card>

        <Card style={styles.eventsCard}>
          <Text style={styles.cardTitle}>{t('dashboard.upcomingEvents')}</Text>
          <View style={styles.event}>
            <MaterialCommunityIcons name="calendar" size={20} color={Colors.primary} />
            <Text style={styles.eventText}>
              {t('dashboard.sampleEvent')}
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: Colors.primary,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.buttonText,
    marginBottom: spacing.xs,
  },
  class: {
    fontSize: 16,
    color: Colors.buttonText,
    opacity: 0.8,
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