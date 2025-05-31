import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Button, Card, DataTable, Text, Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';
import theme from "../../constants/Theme"

const ParentAttendance = ({ navigation }) => {

  const { translations } = useLanguage();
  const [selectedChild, setSelectedChild] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('September');

  // Mock data - Replace with actual API calls
  const children = [
    {
      id: 1,
      name: 'Rahul Kumar',
      attendance: [
        { date: '2023-09-01', status: 'present' },
        { date: '2023-09-02', status: 'present' },
        { date: '2023-09-03', status: 'absent' },
        { date: '2023-09-04', status: 'present' },
        { date: '2023-09-05', status: 'present' },
      ],
      monthlyData: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        data: [85, 88, 92, 90, 87, 85],
      },
    },
    {
      id: 2,
      name: 'Priya Kumar',
      attendance: [
        { date: '2023-09-01', status: 'present' },
        { date: '2023-09-02', status: 'present' },
        { date: '2023-09-03', status: 'present' },
        { date: '2023-09-04', status: 'present' },
        { date: '2023-09-05', status: 'leave' },
      ],
      monthlyData: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        data: [90, 92, 95, 93, 91, 92],
      },
    },
  ];

  const renderChildSelector = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.childSelector}
    >
      {children.map((child, index) => (
        <Button
          key={child.id}
          mode={selectedChild === index ? 'contained' : 'outlined'}
          onPress={() => setSelectedChild(index)}
          style={styles.childButton}
        >
          {child.name}
        </Button>
      ))}
    </ScrollView>
  );

  const renderAttendanceChart = () => {
    const child = children[selectedChild];
    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>Attendance Trend</Title>
          <LineChart
            data={{
              labels: child.monthlyData.labels,
              datasets: [
                {
                  data: child.monthlyData.data,
                },
              ],
            }}
            width={320}
            height={200}
            chartConfig={{
              backgroundColor: theme.Colors.surface,
              backgroundGradientFrom: theme.Colors.surface,
              backgroundGradientTo: theme.Colors.surface,
              decimalPlaces: 0,
              color: (opacity = 1) => theme.Colors.primary,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chart}
            bezier
          />
        </Card.Content>
      </Card>
    );
  };

  const renderAttendanceTable = () => {
    const child = children[selectedChild];
    return (
      <Card style={styles.tableCard}>
        <Card.Content>
          <Title>Recent Attendance</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>

            {child.attendance.map((record, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{record.date}</DataTable.Cell>
                <DataTable.Cell>
                  <View style={styles.statusContainer}>
                    <MaterialCommunityIcons
                      name={
                        record.status === 'present'
                          ? 'check-circle'
                          : record.status === 'absent'
                          ? 'close-circle'
                          : 'clock'
                      }
                      size={20}
                      color={
                        record.status === 'present'
                          ? theme.Colors.success
                          : record.status === 'absent'
                          ? theme.Colors.error
                          : theme.Colors.warning
                      }
                    />
                    <Text style={styles.statusText}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Text>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>
    );
  };

  const renderLeaveSection = () => (
    <Card style={styles.leaveCard}>
      <Card.Content>
        <Title>Leave Management</Title>
        <Button
          mode="contained"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="plus" size={size} color={color} />
          )}
          onPress={() => navigation.navigate('ApplyLeave')}
          style={styles.leaveButton}
        >
          Apply for Leave
        </Button>
        <Button
          mode="outlined"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          )}
          onPress={() => navigation.navigate('LeaveHistory')}
          style={styles.leaveButton}
        >
          Leave History
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      {renderChildSelector()}
      {renderAttendanceChart()}
      {renderAttendanceTable()}
      {renderLeaveSection()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  childSelector: {
    padding: 16,
    flexGrow: 0,
  },
  childButton: {
    marginRight: 8,
  },
  chartCard: {
    margin: 16,
    elevation: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  tableCard: {
    margin: 16,
    elevation: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 8,
  },
  leaveCard: {
    margin: 16,
    elevation: 4,
  },
  leaveButton: {
    marginTop: 8,
  },
});

export default ParentAttendance;