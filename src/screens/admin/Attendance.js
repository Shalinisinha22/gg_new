import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, HeaderBar } from '../../components/StyledComponents';
import { Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Attendance = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const attendanceStats = [
    { label: t('totalStudents'), value: '1,250', icon: '👥' },
    { label: t('present'), value: '1,180', icon: '✅' },
    { label: t('absent'), value: '70', icon: '❌' },
    { label: t('onLeave'), value: '25', icon: '📝' },
  ];

  const departments = [
    { name: 'Science', attendance: '95%', total: 300 },
    { name: 'Commerce', attendance: '92%', total: 280 },
    { name: 'Arts', attendance: '88%', total: 240 },
    // Add more departments as needed
  ];

  return (
    <View style={styles.container}>
      <HeaderBar title={t('attendance')} />
      
      <ScrollView style={styles.content}>
        <Card style={styles.dateCard}>
          <Text style={styles.dateTitle}>{t('selectDate')}</Text>
          <View style={styles.datePickerContainer}>
            {/* Add date picker component here */}
          </View>
        </Card>

        <View style={styles.statsGrid}>
          {attendanceStats.map((stat, index) => (
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
              title={t('markAttendance')}
              variant="primary"
              style={styles.actionButton}
            />
            <Button
              title={t('generateReport')}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>
        </Card>

        <Card style={styles.departmentsCard}>
          <Text style={styles.sectionTitle}>{t('departmentWise')}</Text>
          
          {departments.map((dept, index) => (
            <View key={index} style={styles.departmentItem}>
              <View style={styles.departmentInfo}>
                <Text style={styles.departmentName}>{dept.name}</Text>
                <Text style={styles.departmentTotal}>
                  {t('total')}: {dept.total}
                </Text>
              </View>
              
              <View style={styles.attendanceInfo}>
                <Text style={styles.attendanceValue}>{dept.attendance}</Text>
                <Button
                  title={t('view')}
                  variant="secondary"
                  style={styles.viewButton}
                />
              </View>
            </View>
          ))}
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>{t('settings')}</Text>
          <Button
            title={t('configureRules')}
            variant="secondary"
            style={styles.settingButton}
          />
          <Button
            title={t('manageHolidays')}
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
  dateCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.md,
  },
  datePickerContainer: {
    // Add date picker styles
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
    gap: spacing.sm,
  },
  actionButton: {
    marginBottom: spacing.xs,
  },
  departmentsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  departmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  departmentTotal: {
    fontSize: 12,
    color: Colors.textLight,
  },
  attendanceInfo: {
    alignItems: 'flex-end',
  },
  attendanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.success,
    marginBottom: spacing.xs,
  },
  viewButton: {
    minWidth: 60,
    paddingHorizontal: spacing.sm,
  },
  settingsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  settingButton: {
    marginBottom: spacing.sm,
  },
});

export default Attendance;