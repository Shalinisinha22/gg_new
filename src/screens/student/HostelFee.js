import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, DataTable, Modal, Portal, Text } from 'react-native-paper';

const StudentHostelFee = () => {
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const feeDetails = {
    totalFee: 120000,
    paid: 95000,
    due: 25000,
    dueDate: '15th August 2023',
  };

  const paymentHistory = [
    {
      date: '01 Jul 2023',
      amount: 35000,
      status: 'Paid',
      method: 'UPI',
    },
    {
      date: '01 Jun 2023',
      amount: 30000,
      status: 'Paid',
      method: 'Card',
    },
    {
      date: '01 May 2023',
      amount: 30000,
      status: 'Paid',
      method: 'UPI',
    },
  ];

  const PaymentMethodCard = ({ title, icon, method }) => (
    <TouchableOpacity
      style={[
        styles.paymentMethod,
        selectedPaymentMethod === method && styles.selectedPaymentMethod,
      ]}
      onPress={() => setSelectedPaymentMethod(method)}
    >
      <MaterialCommunityIcons
        name={icon}
        size={30}
        color={selectedPaymentMethod === method ? '#ffffff' : '#4c669f'}
      />
      <Text
        style={[
          styles.paymentMethodText,
          selectedPaymentMethod === method && styles.selectedPaymentMethodText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Fee Overview Card */}
        <Card style={styles.overviewCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Fee Overview</Text>
            <View style={styles.feeDetailsContainer}>
              <View style={styles.feeItem}>
                <Text style={styles.feeLabel}>Total Fee</Text>
                <Text style={styles.feeValue}>₹{feeDetails.totalFee}</Text>
              </View>
              <View style={styles.feeItem}>
                <Text style={styles.feeLabel}>Paid Amount</Text>
                <Text style={[styles.feeValue, { color: '#4CAF50' }]}>₹{feeDetails.paid}</Text>
              </View>
              <View style={styles.feeItem}>
                <Text style={styles.feeLabel}>Due Amount</Text>
                <Text style={[styles.feeValue, { color: '#F44336' }]}>₹{feeDetails.due}</Text>
              </View>
            </View>
            <Text style={styles.dueDate}>Due Date: {feeDetails.dueDate}</Text>
            <Button
              mode="contained"
              onPress={() => setPaymentModalVisible(true)}
              style={styles.payButton}
            >
              Pay Now
            </Button>
          </Card.Content>
        </Card>

        {/* Payment History */}
        <Card style={styles.historyCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Payment History</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Amount</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
                <DataTable.Title>Method</DataTable.Title>
              </DataTable.Header>

              {paymentHistory.map((payment, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{payment.date}</DataTable.Cell>
                  <DataTable.Cell>₹{payment.amount}</DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{ color: '#4CAF50' }}>{payment.status}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>{payment.method}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Payment Modal */}
      <Portal>
        <Modal
          visible={paymentModalVisible}
          onDismiss={() => setPaymentModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Choose Payment Method</Text>
          <View style={styles.paymentMethodsContainer}>
            <PaymentMethodCard
              title="UPI"
              icon="qrcode"
              method="upi"
            />
            <PaymentMethodCard
              title="Card"
              icon="credit-card"
              method="card"
            />
            <PaymentMethodCard
              title="Net Banking"
              icon="bank"
              method="netbanking"
            />
          </View>
          <Button
            mode="contained"
            onPress={() => {
              // Handle payment process
              setPaymentModalVisible(false);
            }}
            disabled={!selectedPaymentMethod}
            style={styles.proceedButton}
          >
            Proceed to Pay ₹{feeDetails.due}
          </Button>
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
  overviewCard: {
    margin: 16,
    borderRadius: 10,
  },
  historyCard: {
    margin: 16,
    marginTop: 0,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  feeDetailsContainer: {
    marginBottom: 16,
  },
  feeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  feeLabel: {
    fontSize: 16,
    color: '#666666',
  },
  feeValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dueDate: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  payButton: {
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
  paymentMethodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentMethod: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4c669f',
    width: '30%',
  },
  selectedPaymentMethod: {
    backgroundColor: '#4c669f',
  },
  paymentMethodText: {
    marginTop: 8,
    color: '#4c669f',
    fontWeight: '500',
  },
  selectedPaymentMethodText: {
    color: '#ffffff',
  },
  proceedButton: {
    borderRadius: 8,
  },
});

export default StudentHostelFee;