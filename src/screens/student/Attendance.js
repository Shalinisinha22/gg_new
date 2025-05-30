import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, DataTable, FAB, Modal, Portal, Text } from 'react-native-paper';

const StudentAttendance = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('August 2023');

  const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      setScannerVisible(true);
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScannerVisible(false);
    // Handle the scanned QR code data here
    console.log('Scanned:', data);
  };

  const attendanceData = [
    { date: '01 Aug', status: 'Present', time: '9:00 AM' },
    { date: '02 Aug', status: 'Present', time: '8:55 AM' },
    { date: '03 Aug', status: 'Absent', time: '-' },
    { date: '04 Aug', status: 'Present', time: '9:05 AM' },
    { date: '05 Aug', status: 'Present', time: '8:50 AM' },
  ];

  return (
    <View style={styles.container}>
      {/* QR Scanner Modal */}
      <Portal>
        <Modal
          visible={scannerVisible}
          onDismiss={() => setScannerVisible(false)}
          contentContainerStyle={styles.scannerModal}
        >
          <View style={styles.scannerContainer}>
            {/* <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            /> */}
            <View style={styles.scannerOverlay}>
              <Text style={styles.scannerText}>Align QR code within frame</Text>
            </View>
          </View>
        </Modal>
      </Portal>

      <ScrollView>
        {/* Today's Status */}
        <Card style={styles.todayCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Today's Status</Text>
            <View style={styles.statusContainer}>
              <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
              <Text style={styles.statusText}>Present</Text>
              <Text style={styles.timeText}>Checked in at 9:00 AM</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Monthly Overview */}
        <Card style={styles.monthlyCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Monthly Overview</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>85%</Text>
                <Text style={styles.statLabel}>Attendance</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>17</Text>
                <Text style={styles.statLabel}>Present Days</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Absent Days</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Attendance History */}
        <Card style={styles.historyCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Attendance History</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
                <DataTable.Title>Time</DataTable.Title>
              </DataTable.Header>

              {attendanceData.map((record, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{record.date}</DataTable.Cell>
                  <DataTable.Cell>
                    <Text
                      style={{
                        color: record.status === 'Present' ? '#4CAF50' : '#F44336',
                      }}
                    >
                      {record.status}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>{record.time}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* QR Scan FAB */}
      <FAB
        icon="qrcode-scan"
        style={styles.fab}
        onPress={requestCameraPermission}
        label="Scan QR"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  todayCard: {
    margin: 16,
    borderRadius: 10,
  },
  monthlyCard: {
    margin: 16,
    marginTop: 0,
    borderRadius: 10,
  },
  historyCard: {
    margin: 16,
    marginTop: 0,
    borderRadius: 10,
    marginBottom: 80,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 'auto',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c669f',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#4c669f',
  },
  scannerModal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    height: '80%',
  },
  scannerContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  scannerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
    borderRadius: 8,
  },
});

export default StudentAttendance;