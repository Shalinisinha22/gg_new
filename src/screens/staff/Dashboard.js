import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, HeaderBar } from '../../components/StyledComponents';
import { borderRadius, Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Dashboard = ({ navigation }) => {
  const { t } = useLanguage();

  const todayStats = [
    { label: t('totalClasses'), value: '6', icon: 'book-open-variant', color: '#4CAF50' },
    { label: t('totalStudents'), value: '180', icon: 'account-group', color: '#2196F3' },
    { label: t('attendance'), value: '92%', icon: 'calendar-check', color: '#FFC107' },
    { label: t('pendingTasks'), value: '5', icon: 'clipboard-list', color: '#F44336' },
  ];

  const quickActions = [
    { title: t('markAttendance'), icon: 'calendar-check', screen: 'Attendance' },
    { title: t('assignments'), icon: 'file-document-edit', screen: 'Assignments' },
    { title: t('examSchedule'), icon: 'calendar-clock', screen: 'Exams' },
    { title: t('grades'), icon: 'chart-box', screen: 'Grades' },
    { title: t('timetable'), icon: 'timetable', screen: 'Timetable' },
    { title: t('communication'), icon: 'message', screen: 'Communication' },
  ];

  const upcomingClasses = [
    { subject: 'Mathematics', class: 'X-A', time: '10:00 AM', room: '301' },
    { subject: 'Physics', class: 'XII-B', time: '11:30 AM', room: '405' },
    { subject: 'Chemistry', class: 'XI-A', time: '02:00 PM', room: 'Lab 2' },
  ];

  const handleActionPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <HeaderBar title={t('staffDashboard')} />
      
      <ScrollView style={styles.content}>
        <Card style={styles.profileCard}>
          <Image
            // source={require('../../assets/staff-avatar.svg')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Prof. John Smith</Text>
            <Text style={styles.department}>{t('scienceDepartment')}</Text>
          </View>
        </Card>

        <View style={styles.statsGrid}>
          {todayStats.map((stat, index) => (
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

        <Text style={styles.sectionTitle}>{t('upcomingClasses')}</Text>
        {upcomingClasses.map((classInfo, index) => (
          <Card key={index} style={styles.classCard}>
            <View style={styles.classHeader}>
              <MaterialCommunityIcons name="book-open-page-variant" size={24} color={Colors.primary} />
              <Text style={styles.subjectName}>{classInfo.subject}</Text>
            </View>
            <View style={styles.classDetails}>
              <View style={styles.classInfo}>
                <MaterialCommunityIcons name="account-group" size={16} color={Colors.textLight} />
                <Text style={styles.classText}>{classInfo.class}</Text>
              </View>
              <View style={styles.classInfo}>
                <MaterialCommunityIcons name="clock-outline" size={16} color={Colors.textLight} />
                <Text style={styles.classText}>{classInfo.time}</Text>
              </View>
              <View style={styles.classInfo}>
                <MaterialCommunityIcons name="door" size={16} color={Colors.textLight} />
                <Text style={styles.classText}>{classInfo.room}</Text>
              </View>
            </View>
          </Card>
        ))}

        <Card style={styles.announcementCard}>
          <Text style={styles.cardTitle}>{t('announcements')}</Text>
          <View style={styles.announcement}>
            <MaterialCommunityIcons name="bullhorn" size={20} color={Colors.primary} />
            <Text style={styles.announcementText}>
              {t('sampleAnnouncement')}
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
  department: {
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
  classCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: spacing.sm,
  },
  classDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: spacing.xl,
  },
  classInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classText: {
    fontSize: 14,
    color: Colors.textLight,
    marginLeft: spacing.xs,
  },
  announcementCard: {
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
});

export default Dashboard;