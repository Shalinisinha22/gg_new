import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, HeaderBar, Input } from '../../components/StyledComponents';
import { Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';
import theme from "../../constants/Theme"
const Subjects = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const subjectStats = [
    { label: t('totalSubjects'), value: '32', icon: '📚' },
    { label: t('departments'), value: '5', icon: '🏢' },
    { label: t('teachers'), value: '45', icon: '👨‍🏫' },
    { label: t('students'), value: '1250', icon: '👥' },
  ];

  const popularSubjects = [
    {
      name: 'Advanced Mathematics',
      department: 'Science',
      students: 180,
      teachers: 4,
    },
    {
      name: 'English Literature',
      department: 'Arts',
      students: 150,
      teachers: 3,
    },
    // Add more subjects as needed
  ];

  return (
    <View style={styles.container}>
      <HeaderBar title={t('subjects')} />
      
      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          {subjectStats.map((stat, index) => (
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
              title={t('addSubject')}
              variant="primary"
              style={styles.actionButton}
            />
            <Button
              title={t('assignTeachers')}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>
        </Card>

        <Card style={styles.searchCard}>
          <Input
            placeholder={t('searchSubjects')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </Card>

        <Card style={styles.popularCard}>
          <Text style={styles.sectionTitle}>{t('popularSubjects')}</Text>
          
          {popularSubjects.map((subject, index) => (
            <View key={index} style={styles.subjectItem}>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectDetails}>
                  {subject.department} • {subject.teachers} {t('teachers')} • {subject.students} {t('students')}
                </Text>
              </View>
              
              <View style={styles.subjectActions}>
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
          <Text style={styles.sectionTitle}>{t('subjectSettings')}</Text>
          <Button
            title={t('curriculumSetup')}
            variant="secondary"
            style={styles.settingButton}
          />
          <Button
            title={t('creditSystem')}
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
  popularCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  subjectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  subjectDetails: {
    fontSize: 12,
    color: Colors.textLight,
  },
  subjectActions: {
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

export default Subjects;