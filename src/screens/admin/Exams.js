import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, HeaderBar, Input } from '../../components/StyledComponents';
import { Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Exams = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const examStats = [
    { label: t('upcomingExams'), value: '8', icon: '📅' },
    { label: t('ongoingExams'), value: '3', icon: '✍️' },
    { label: t('completedExams'), value: '25', icon: '✅' },
    { label: t('pendingResults'), value: '5', icon: '⏳' },
  ];

  const upcomingExams = [
    {
      name: 'Mid-Term Mathematics',
      date: '2024-02-15',
      department: 'Science',
      students: 120,
    },
    {
      name: 'Final English Literature',
      date: '2024-02-18',
      department: 'Arts',
      students: 85,
    },
    // Add more exams as needed
  ];

  return (
    <View style={styles.container}>
      <HeaderBar title={t('exams')} />
      
      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          {examStats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        <Card style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
          <View style={styles.actionButtons}>
            <Button
              title={t('scheduleExam')}
              variant="primary"
              style={styles.actionButton}
            />
            <Button
              title={t('publishResults')}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>
        </Card>

        <Card style={styles.searchCard}>
          <Input
            placeholder={t('searchExams')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </Card>

        <Card style={styles.upcomingCard}>
          <Text style={styles.sectionTitle}>{t('upcomingExams')}</Text>
          
          {upcomingExams.map((exam, index) => (
            <View key={index} style={styles.examItem}>
              <View style={styles.examInfo}>
                <Text style={styles.examName}>{exam.name}</Text>
                <Text style={styles.examDetails}>
                  {exam.date} • {exam.department} • {exam.students} {t('students')}
                </Text>
              </View>
              
              <View style={styles.examActions}>
                <Button
                  title={t('edit')}
                  variant="secondary"
                  style={styles.actionButton}
                />
                <Button
                  title={t('details')}
                  variant="primary"
                  style={styles.actionButton}
                />
              </View>
            </View>
          ))}
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>{t('examSettings')}</Text>
          <Button
            title={t('gradeSystem')}
            variant="secondary"
            style={styles.settingButton}
          />
          <Button
            title={t('evaluationRules')}
            variant="secondary"
            style={styles.settingButton}
          />
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statCard: {
    width: '48%',
    marginBottom: spacing.sm,
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.buttonText,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.buttonText,
    opacity: 0.8,
    textAlign: 'center',
  },
  actionsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  searchCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  searchInput: {
    marginBottom: 0,
  },
  upcomingCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  examItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  examInfo: {
    flex: 1,
  },
  examName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  examDetails: {
    fontSize: 12,
    color: Colors.textLight,
  },
  examActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  settingsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  settingButton: {
    marginBottom: spacing.sm,
  },
});

export default Exams;