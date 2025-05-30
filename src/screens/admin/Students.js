import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, HeaderBar, Input } from '../../components/StyledComponents';
import { borderRadius, Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';
import theme from "../../constants/Theme"
const Students = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const studentStats = [
    { label: t('totalStudents'), value: '1,250', icon: '👥' },
    { label: t('departments'), value: '5', icon: '🏢' },
    { label: t('attendance'), value: '92%', icon: '📊' },
    { label: t('avgGrade'), value: 'B+', icon: '📈' },
  ];

  const topStudents = [
    {
      name: 'Emily Parker',
      department: 'Science',
      grade: 'A',
      attendance: '98%',
      achievements: ['Science Fair Winner', 'Perfect Attendance'],
    },
    {
      name: 'James Wilson',
      department: 'Mathematics',
      grade: 'A+',
      attendance: '95%',
      achievements: ['Math Olympiad Gold', 'Student Council'],
    },
    // Add more students as needed
  ];

  return (
    <View style={styles.container}>
      <HeaderBar title={t('students')} />
      
      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          {studentStats.map((stat, index) => (
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
              title={t('addStudent')}
              variant="primary"
              style={styles.actionButton}
            />
            <Button
              title={t('generateReports')}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>
        </Card>

        <Card style={styles.searchCard}>
          <Input
            placeholder={t('searchStudents')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </Card>

        <Card style={styles.topStudentsCard}>
          <Text style={styles.sectionTitle}>{t('topPerformers')}</Text>
          
          {topStudents.map((student, index) => (
            <View key={index} style={styles.studentItem}>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentDetails}>
                  {student.department} • Grade: {student.grade} • {student.attendance}
                </Text>
                <View style={styles.achievementsContainer}>
                  {student.achievements.map((achievement, idx) => (
                    <View key={idx} style={styles.achievementTag}>
                      <Text style={styles.achievementText}>🏆 {achievement}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.studentActions}>
                <Button
                  title={t('profile')}
                  variant="secondary"
                  style={styles.actionButton}
                />
                <Button
                  title={t('progress')}
                  variant="primary"
                  style={styles.actionButton}
                />
              </View>
            </View>
          ))}
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>{t('studentSettings')}</Text>
          <Button
            title={t('admissionRules')}
            variant="secondary"
            style={styles.settingButton}
          />
          <Button
            title={t('gradingSystem')}
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
  topStudentsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  studentDetails: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: spacing.xs,
  },
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  achievementTag: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  achievementText: {
    fontSize: 10,
    color: Colors.buttonText,
  },
  studentActions: {
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

export default Students;