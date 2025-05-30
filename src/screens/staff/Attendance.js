import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, HeaderBar, Input } from '../../components/StyledComponents';
import { Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Attendance = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const students = [
    { id: '1', name: 'John Doe', present: true },
    { id: '2', name: 'Jane Smith', present: false },
    { id: '3', name: 'Mike Johnson', present: true },
    // Add more students as needed
  ];

  const attendanceStats = {
    total: students.length,
    present: students.filter(s => s.present).length,
    absent: students.filter(s => !s.present).length,
  };

  return (
    <View style={styles.container}>
      <HeaderBar title={t('attendance')} />
      
      <ScrollView style={styles.content}>
        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>{t('todayStats')}</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{attendanceStats.total}</Text>
              <Text style={styles.statLabel}>{t('total')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors.success }]}>
                {attendanceStats.present}
              </Text>
              <Text style={styles.statLabel}>{t('present')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors.error }]}>
                {attendanceStats.absent}
              </Text>
              <Text style={styles.statLabel}>{t('absent')}</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.dateCard}>
          <Text style={styles.dateTitle}>{t('selectDate')}</Text>
          <View style={styles.datePickerContainer}>
            {/* Add date picker component here */}
          </View>
        </Card>

        <Card style={styles.studentListCard}>
          <Text style={styles.listTitle}>{t('studentList')}</Text>
          
          <View style={styles.searchContainer}>
            <Input
              placeholder={t('searchStudent')}
              style={styles.searchInput}
            />
          </View>

          {students.map((student) => (
            <View key={student.id} style={styles.studentItem}>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text
                  style={[
                    styles.attendanceStatus,
                    { color: student.present ? Colors.success : Colors.error },
                  ]}
                >
                  {student.present ? t('present') : t('absent')}
                </Text>
              </View>
              <View style={styles.actionButtons}>
                <Button
                  title={t('present')}
                  variant={student.present ? 'primary' : 'secondary'}
                  style={styles.actionButton}
                />
                <Button
                  title={t('absent')}
                  variant={!student.present ? 'primary' : 'secondary'}
                  style={styles.actionButton}
                />
              </View>
            </View>
          ))}
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
  statsCard: {
    marginBottom: spacing.md,
    backgroundColor: Colors.primary,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.buttonText,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  dateCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  datePickerContainer: {
    // Add date picker styles
  },
  studentListCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.md,
  },
  searchContainer: {
    marginBottom: spacing.md,
  },
  searchInput: {
    marginBottom: 0,
  },
  studentItem: {
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: spacing.md,
  },
  studentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  attendanceStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  actionButton: {
    minWidth: 80,
  },
});

export default Attendance;