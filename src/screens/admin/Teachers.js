import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, HeaderBar, Input } from '../../components/StyledComponents';
import { Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';
import theme from "../../constants/Theme"
const Teachers = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const teacherStats = [
    { label: t('totalTeachers'), value: '45', icon: '👨‍🏫' },
    { label: t('departments'), value: '5', icon: '🏢' },
    { label: t('activeClasses'), value: '120', icon: '📚' },
    { label: t('avgRating'), value: '4.5', icon: '⭐' },
  ];

  const topTeachers = [
    {
      name: 'Dr. Sarah Johnson',
      department: 'Science',
      subjects: ['Physics', 'Chemistry'],
      rating: 4.8,
      students: 180,
    },
    {
      name: 'Prof. Michael Brown',
      department: 'Mathematics',
      subjects: ['Calculus', 'Statistics'],
      rating: 4.7,
      students: 150,
    },
    // Add more teachers as needed
  ];

  return (
    <View style={styles.container}>
      <HeaderBar title={t('teachers')} />
      
      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          {teacherStats.map((stat, index) => (
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
              title={t('addTeacher')}
              variant="primary"
              style={styles.actionButton}
            />
            <Button
              title={t('assignClasses')}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>
        </Card>

        <Card style={styles.searchCard}>
          <Input
            placeholder={t('searchTeachers')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </Card>

        <Card style={styles.topTeachersCard}>
          <Text style={styles.sectionTitle}>{t('topTeachers')}</Text>
          
          {topTeachers.map((teacher, index) => (
            <View key={index} style={styles.teacherItem}>
              <View style={styles.teacherInfo}>
                <Text style={styles.teacherName}>{teacher.name}</Text>
                <Text style={styles.teacherDetails}>
                  {teacher.department} • {teacher.subjects.join(', ')}
                </Text>
                <View style={styles.teacherStats}>
                  <Text style={styles.teacherRating}>⭐ {teacher.rating}</Text>
                  <Text style={styles.teacherStudents}>👥 {teacher.students}</Text>
                </View>
              </View>
              
              <View style={styles.teacherActions}>
                <Button
                  title={t('profile')}
                  variant="secondary"
                  style={styles.actionButton}
                />
                <Button
                  title={t('schedule')}
                  variant="primary"
                  style={styles.actionButton}
                />
              </View>
            </View>
          ))}
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>{t('teacherSettings')}</Text>
          <Button
            title={t('performanceMetrics')}
            variant="secondary"
            style={styles.settingButton}
          />
          <Button
            title={t('departmentRules')}
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
  topTeachersCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  teacherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  teacherDetails: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: spacing.xs,
  },
  teacherStats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  teacherRating: {
    fontSize: 12,
    color: Colors.success,
  },
  teacherStudents: {
    fontSize: 12,
    color: Colors.textLight,
  },
  teacherActions: {
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

export default Teachers;