import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, DataTable, Modal, Portal, Text, TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

const StudentGatePass = () => {
  const [requestModalVisible, setRequestModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    returnTime: '',
    reason: '',
  });

  const gatePassHistory = [
    {
      id: 'GP001',
      date: '05 Aug 2023',
      status: 'Approved',
      time: '2:00 PM - 6:00 PM',
    },
    {
      id: 'GP002',
      date: '01 Aug 2023',
      status: 'Completed',
      time: '10:00 AM - 1:00 PM',
    },
    {
      id: 'GP003',
      date: '28 Jul 2023',
      status: 'Rejected',
      time: '3:00 PM - 5:00 PM',
    },
  ];

  const handleSubmit = () => {
    // Here you would typically make an API call to submit the gate pass request
    setRequestModalVisible(false);
    // For demo, show QR code immediately
    setQrModalVisible(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return '#4CAF50';
      case 'Completed':
        return '#2196F3';
      case 'Rejected':
        return '#F44336';
      default:
        return '#666666';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Active Gate Pass Card */}
        <Card style={styles.activeCard}>
          <Card.Content>
            <View style={styles.activeHeader}>
              <MaterialCommunityIcons name="timer-sand" size={24} color="#4CAF50" />
              <Text style={styles.activeTitle}>Active Gate Pass</Text>
            </View>
            <View style={styles.activeDetails}>
              <Text style={styles.activeText}>Valid till: Today, 6:00 PM</Text>
              <Button
                mode="contained"
                onPress={() => setQrModalVisible(true)}
                style={styles.viewQrButton}
              >
                View QR
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Gate Pass History */}
        <Card style={styles.historyCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Gate Pass History</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Time</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
              </DataTable.Header>

              {gatePassHistory.map((pass) => (
                <DataTable.Row key={pass.id}>
                  <DataTable.Cell>{pass.date}</DataTable.Cell>
                  <DataTable.Cell>{pass.time}</DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{ color: getStatusColor(pass.status) }}>
                      {pass.status}
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Request Gate Pass FAB */}
      <Button
        mode="contained"
        onPress={() => setRequestModalVisible(true)}
        style={styles.fab}
        icon="plus"
      >
        Request Gate Pass
      </Button>

      {/* Request Modal */}
      <Portal>
        <Modal
          visible={requestModalVisible}
          onDismiss={() => setRequestModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Request Gate Pass</Text>
          <TextInput
            label="Date"
            value={formData.date}
            onChangeText={(text) => setFormData({ ...formData, date: text })}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Exit Time"
            value={formData.time}
            onChangeText={(text) => setFormData({ ...formData, time: text })}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Return Time"
            value={formData.returnTime}
            onChangeText={(text) => setFormData({ ...formData, returnTime: text })}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Reason"
            value={formData.reason}
            onChangeText={(text) => setFormData({ ...formData, reason: text })}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={3}
          />
          <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
            Submit Request
          </Button>
        </Modal>

        {/* QR Code Modal */}
        <Modal
          visible={qrModalVisible}
          onDismiss={() => setQrModalVisible(false)}
          contentContainerStyle={styles.qrModalContainer}
        >
          <Text style={styles.qrTitle}>Gate Pass QR Code</Text>
          <View style={styles.qrContainer}>
            <QRCode
              value="GATEPASS-001"
              size={200}
              backgroundColor="white"
            />
          </View>
          <Text style={styles.qrInfo}>Valid till: Today, 6:00 PM</Text>
          <Text style={styles.qrNote}>
            Show this QR code at the gate for verification
          </Text>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  activeCard: {
    margin: 16,
    borderRadius: 10,
  },
  activeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  activeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeText: {
    fontSize: 16,
    color: '#666666',
  },
  viewQrButton: {
    borderRadius: 8,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  qrModalContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  qrInfo: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  qrNote: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default StudentGatePass;