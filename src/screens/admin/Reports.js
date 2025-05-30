import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Card, List, SegmentedButtons, Title, useTheme } from 'react-native-paper';
import { useLanguage } from '../../i18n/LanguageContext';
import theme from "../../constants/Theme"
const AdminReports = () => {
  const { t } = useLanguage();

  const [reportType, setReportType] = useState('attendance');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.Colors.background,
    },
    segmentedButtons: {
      margin: 16,
    },
    card: {
      margin: 16,
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16,
    },
  });

  const screenWidth = Dimensions.get('window').width - 32;

  const chartConfig = {
    backgroundColor: theme.Colors.surface,
    backgroundGradientFrom: theme.Colors.surface,
    backgroundGradientTo: theme.Colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => theme.Colors.primary,
    labelColor: (opacity = 1) => theme.Colors.text,
    style: {
      borderRadius: 16,
    },
  };

  // Mock data
  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [85, 88, 92, 90, 87, 91],
        color: (opacity = 1) => theme.Colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const feeData = [
    {
      name: t('admin.reports.paid'),
      population: 85,
      color: theme.Colors.primary,
      legendFontColor: theme.Colors.text,
    },
    {
      name: t('admin.reports.pending'),
      population: 15,
      color: theme.Colors.error,
      legendFontColor: theme.Colors.text,
    },
  ];

  const performanceData = {
    labels: ['Math', 'Science', 'English', 'History', 'Geography'],
    datasets: [
      {
        data: [75, 82, 88, 79, 85],
        color: (opacity = 1) => theme.Colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const AttendanceReport = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{t('admin.reports.attendanceOverview')}</Title>
        <LineChart
          data={attendanceData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
        <List.Section>
          <List.Item
            title={t('admin.reports.averageAttendance')}
            description="88.8%"
            left={props => <List.Icon {...props} icon="chart-line" />}
          />
          <List.Item
            title={t('admin.reports.lowestAttendance')}
            description="85%"
            left={props => <List.Icon {...props} icon="arrow-down" />}
          />
          <List.Item
            title={t('admin.reports.highestAttendance')}
            description="92%"
            left={props => <List.Icon {...props} icon="arrow-up" />}
          />
        </List.Section>
      </Card.Content>
    </Card>
  );

  const FeeReport = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{t('admin.reports.feeCollection')}</Title>
        <PieChart
          data={feeData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
        <List.Section>
          <List.Item
            title={t('admin.reports.totalCollection')}
            description="₹8.5L"
            left={props => <List.Icon {...props} icon="cash" />}
          />
          <List.Item
            title={t('admin.reports.pendingAmount')}
            description="₹1.5L"
            left={props => <List.Icon {...props} icon="cash-clock" />}
          />
        </List.Section>
      </Card.Content>
    </Card>
  );

  const PerformanceReport = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{t('admin.reports.academicPerformance')}</Title>
        <LineChart
          data={performanceData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
        <List.Section>
          <List.Item
            title={t('admin.reports.averageScore')}
            description="81.8%"
            left={props => <List.Icon {...props} icon="school" />}
          />
          <List.Item
            title={t('admin.reports.topPerformer')}
            description="English - 88%"
            left={props => <List.Icon {...props} icon="trophy" />}
          />
          <List.Item
            title={t('admin.reports.needsImprovement')}
            description="History - 79%"
            left={props => <List.Icon {...props} icon="alert" />}
          />
        </List.Section>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={reportType}
        onValueChange={setReportType}
        buttons={[
          { value: 'attendance', label: t('admin.reports.attendance') },
          { value: 'fee', label: t('admin.reports.fee') },
          { value: 'performance', label: t('admin.reports.performance') },
        ]}
        style={styles.segmentedButtons}
      />

      <ScrollView>
        {reportType === 'attendance' && <AttendanceReport />}
        {reportType === 'fee' && <FeeReport />}
        {reportType === 'performance' && <PerformanceReport />}
      </ScrollView>
    </View>
  );
};

export default AdminReports;