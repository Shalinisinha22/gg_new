import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, DataTable, Modal, Paragraph, Portal, Text, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLanguage } from '../../i18n/LanguageContext';
import theme from "../../constants/Theme"
const ParentFee = ({ navigation }) => {

  const { translations } = useLanguage();
  const [selectedChild, setSelectedChild] = useState(0);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Mock data - Replace with actual API calls
  const children = [
    {
      id: 1,
      name: 'Rahul Kumar',
      currentDue: 25000,
      nextDueDate: '2023-10-15',
      payments: [
        { id: 1, date: '2023-09-01', amount: 25000, status: 'paid', receipt: 'REC001' },
        { id: 2, date: '2023-08-01', amount: 25000, status: 'paid', receipt: 'REC002' },
      ],
    },
    {
      id: 2,
      name: 'Priya Kumar',
      currentDue: 0,
      nextDueDate: '2023-10-15',
      payments: [
        { id: 3, date: '2023-09-01', amount: 25000, status: 'paid', receipt: 'REC003' },
        { id: 4, date: '2023-08-01', amount: 25000, status: 'paid', receipt: 'REC004' },
      ],
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

  const renderFeeSummary = () => {
    const child = children[selectedChild];
    return (
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Title>Fee Summary</Title>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Paragraph>Current Due</Paragraph>
              <Title style={child.currentDue > 0 ? styles.dueAmount : styles.paidAmount}>
                ₹{child.currentDue}
              </Title>
            </View>
            <View style={styles.summaryItem}>
              <Paragraph>Next Due Date</Paragraph>
              <Title>{child.nextDueDate}</Title>
            </View>
          </View>
          {child.currentDue > 0 && (
            <Button
              mode="contained"
              icon="cash"
              onPress={() => setPaymentModalVisible(true)}
              style={styles.payButton}
            >
              Pay Now
            </Button>
          )}
        </Card.Content>
      </Card>
    );
  };

  const renderPaymentHistory = () => {
    const child = children[selectedChild];
    return (
      <Card style={styles.historyCard}>
        <Card.Content>
          <Title>Payment History</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
              <DataTable.Title>Receipt</DataTable.Title>
            </DataTable.Header>

            {child.payments.map((payment) => (
              <DataTable.Row key={payment.id}>
                <DataTable.Cell>{payment.date}</DataTable.Cell>
                <DataTable.Cell numeric>₹{payment.amount}</DataTable.Cell>
                <DataTable.Cell>
                  <View style={styles.statusContainer}>
                    <Icon
                      name={payment.status === 'paid' ? 'check-circle' : 'clock'}
                      size={20}
                      color={payment.status === 'paid' ? 'green' : 'orange'}
                    />
                    <Text style={styles.statusText}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </Text>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    mode="text"
                    compact
                    onPress={() => {
                      // Handle receipt download
                    }}
                  >
                    <Icon name="download" size={20} />
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>
    );
  };

  const renderPaymentModal = () => (
    <Portal>
      <Modal
        visible={paymentModalVisible}
        onDismiss={() => setPaymentModalVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <Title style={styles.modalTitle}>Choose Payment Method</Title>
        <View style={styles.paymentMethods}>
          <Card
            style={[styles.paymentMethod, selectedPaymentMethod === 'upi' && styles.selectedMethod]}
            onPress={() => setSelectedPaymentMethod('upi')}
          >
            <Card.Content style={styles.paymentMethodContent}>
              <Icon name="qrcode" size={32} color={theme.Colors.primary} />
              <Paragraph>UPI</Paragraph>
            </Card.Content>
          </Card>

          <Card
            style={[
              styles.paymentMethod,
              selectedPaymentMethod === 'card' && styles.selectedMethod,
            ]}
            onPress={() => setSelectedPaymentMethod('card')}
          >
            <Card.Content style={styles.paymentMethodContent}>
              <Icon name="credit-card" size={32} color={theme.Colors.primary} />
              <Paragraph>Card</Paragraph>
            </Card.Content>
          </Card>

          <Card
            style={[
              styles.paymentMethod,
              selectedPaymentMethod === 'netbanking' && styles.selectedMethod,
            ]}
            onPress={() => setSelectedPaymentMethod('netbanking')}
          >
            <Card.Content style={styles.paymentMethodContent}>
              <Icon name="bank" size={32} color={theme.Colors.primary} />
              <Paragraph>Net Banking</Paragraph>
            </Card.Content>
          </Card>
        </View>

        <Button
          mode="contained"
          disabled={!selectedPaymentMethod}
          onPress={() => {
            // Handle payment process
            setPaymentModalVisible(false);
            setSelectedPaymentMethod(null);
          }}
          style={styles.proceedButton}
        >
          Proceed to Pay
        </Button>
      </Modal>
    </Portal>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderChildSelector()}
        {renderFeeSummary()}
        {renderPaymentHistory()}
      </ScrollView>
      {renderPaymentModal()}
    </View>
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
  summaryCard: {
    margin: 16,
    elevation: 4,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  dueAmount: {
    color: 'red',
  },
  paidAmount: {
    color: 'green',
  },
  payButton: {
    marginTop: 8,
  },
  historyCard: {
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
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  paymentMethod: {
    width: '30%',
  },
  selectedMethod: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  paymentMethodContent: {
    alignItems: 'center',
  },
  proceedButton: {
    marginTop: 16,
  },
});

export default ParentFee;