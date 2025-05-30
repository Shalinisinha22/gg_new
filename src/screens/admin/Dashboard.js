import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, HeaderBar } from '../../components/StyledComponents';
import { borderRadius, Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Dashboard = ({ navigation }) => {
  const { t } = useLanguage();

  const overviewStats = [
    { label: t('totalStudents'), value: '1,250', icon: 'account-group', color: '#4CAF50' },
    { label: t('totalStaff'), value: '85', icon: 'account-tie', color: '#2196F3' },
    { label: t('attendance'), value: '95%', icon: 'calendar-check', color: '#FFC107' },
    { label: t('revenue'), value: '₹15L', icon: 'cash', color: '#F44336' },
  ];

  const quickActions = [
    { title: t('manageStudents'), icon: 'account-group', screen: 'Students' },
    { title: t('manageStaff'), icon: 'account-tie', screen: 'Staff' },
    { title: t('manageClasses'), icon: 'google-classroom', screen: 'Classes' },
    { title: t('manageExams'), icon: 'file-document', screen: 'Exams' },
    { title: t('manageFees'), icon: 'cash', screen: 'Fees' },
    { title: t('reports'), icon: 'chart-box', screen: 'Reports' },
  ];

  const recentActivities = [
    { title: t('newAdmission'), description: t('studentAdmitted'), time: '2 hours ago', icon: 'account-plus' },
    { title: t('feeCollection'), description: t('feesCollected'), time: '3 hours ago', icon: 'cash-plus' },
    { title: t('examScheduled'), description: t('midtermExam'), time: '5 hours ago', icon: 'calendar-clock' },
  ];

  const handleActionPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <HeaderBar title={t('adminDashboard')} />
      
      <ScrollView style={styles.content}>
        <Card style={styles.profileCard}>
          <Image
            // source={require('../../assets/admin-avatar.svg')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Admin Name</Text>
            <Text style={styles.role}>{t('schoolAdmin')}</Text>
          </View>
        </Card>

        <View style={styles.statsGrid}>
          {overviewStats.map((stat, index) => (
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

        <Text style={styles.sectionTitle}>{t('recentActivities')}</Text>
        {recentActivities.map((activity, index) => (
          <Card key={index} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <MaterialCommunityIcons
                name={activity.icon}
                size={24}
                color={Colors.primary}
              />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
              </View>
              <Text style={styles.activityTime}>{activity.time}</Text>
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
  role: {
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
  activityCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  activityDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: spacing.xs,
  },
  activityTime: {
    fontSize: 12,
    color: Colors.textLight,
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