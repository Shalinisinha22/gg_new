import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, HeaderBar } from '../../components/StyledComponents';
import { Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Reports = () => {
  const { t } = useLanguage();

  const reportCategories = [
    {
      title: t('attendanceReports'),
      icon: '📊',
      description: t('viewAttendanceStats'),
    },
    {
      title: t('academicReports'),
      icon: '📚',
      description: t('viewAcademicProgress'),
    },
    {
      title: t('behavioralReports'),
      icon: '🎯',
      description: t('viewBehavioralRecords'),
    },
    {
      title: t('examReports'),
      icon: '📝',
      description: t('viewExamResults'),
    },
  ];

  return (
    <View style={styles.container}>
      <HeaderBar title={t('reports')} />
      
      <ScrollView style={styles.content}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{t('quickSummary')}</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>95%</Text>
              <Text style={styles.statLabel}>{t('attendance')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>87%</Text>
              <Text style={styles.statLabel}>{t('performance')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>{t('reports')}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.categoryGrid}>
          {reportCategories.map((category, index) => (
            <Card key={index} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>
                {category.description}
              </Text>
              <Button
                title={t('view')}
                variant="secondary"
                style={styles.viewButton}
              />
            </Card>
          ))}
        </View>

        <Card style={styles.recentReportsCard}>
          <Text style={styles.sectionTitle}>{t('recentReports')}</Text>
          {/* Add recent reports list here */}
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
  summaryCard: {
    marginBottom: spacing.md,
    backgroundColor: Colors.primary,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.buttonText,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.sm,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.buttonText,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.buttonText,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  categoryCard: {
    width: '48%',
    marginBottom: spacing.md,
    backgroundColor: Colors.secondary,
    padding: spacing.md,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  categoryDescription: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: spacing.sm,
  },
  viewButton: {
    marginTop: 'auto',
  },
  recentReportsCard: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.md,
  },
});

export default Reports;