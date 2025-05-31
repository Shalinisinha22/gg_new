import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Modal, Paragraph, Portal, Text, Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';
import theme from "../../constants/Theme";

const LeaveHistory = ({ navigation }) => {

  const { translations } = useLanguage();
  const [selectedChild, setSelectedChild] = useState(0);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // Mock data - Replace with actual API calls
  const children = [
    {
      id: 1,
      name: 'Rahul Kumar',
      class: 'XII-A',
      leaves: [
        {
          id: 1,
          startDate: '2023-09-10',
          endDate: '2023-09-12',
          reason: 'Medical appointment and recovery',
          status: 'Approved',
          approvedBy: 'Mr. Sharma (Class Teacher)',
          remarks: 'Get well soon',
          documents: ['medical_certificate.pdf'],
        },
        {
          id: 2,
          startDate: '2023-08-25',
          endDate: '2023-08-25',
          reason: 'Family function',
          status: 'Rejected',
          approvedBy: 'Mrs. Gupta (Hostel Warden)',
          remarks: 'Too many leaves this month',
          documents: [],
        },
        {
          id: 3,
          startDate: '2023-09-15',
          endDate: '2023-09-16',
          reason: 'Religious festival',
          status: 'Pending',
          documents: [],
        },
      ],
    },
    // Add more children here
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'orange';
    }
  };

  const renderLeaveList = () => {
    const child = children[selectedChild];
    return (
      <View style={styles.leaveList}>
        {child.leaves.map((leave) => (
          <Card
            key={leave.id}
            style={styles.leaveCard}
            onPress={() => {
              setSelectedLeave(leave);
              setDetailModalVisible(true);
            }}
          >
            <Card.Content>
              <View style={styles.leaveHeader}>
                <View>
                  <Title style={styles.dates}>
                    {leave.startDate === leave.endDate
                      ? leave.startDate
                      : `${leave.startDate} - ${leave.endDate}`}
                  </Title>
                  <Paragraph style={styles.duration}>
                    {leave.startDate === leave.endDate
                      ? '1 day'
                      : `${Math.ceil(
                          (new Date(leave.endDate) - new Date(leave.startDate)) /
                            (1000 * 60 * 60 * 24) + 1
                        )} days`}
                  </Paragraph>
                </View>
                <Chip
                  mode="outlined"
                  style={[styles.statusChip, { borderColor: getStatusColor(leave.status) }]}
                  textStyle={{ color: getStatusColor(leave.status) }}
                >
                  {leave.status}
                </Chip>
              </View>

              <Paragraph numberOfLines={2} style={styles.reason}>
                {leave.reason}
              </Paragraph>

              {leave.documents.length > 0 && (
                <View style={styles.attachments}>
                  <MaterialCommunityIcons 
                    name="paperclip" 
                    size={16} 
                    color={theme.Colors.primary} 
                  />
                  <Text style={styles.attachmentText}>
                    {leave.documents.length} attachment(s)
                  </Text>
                </View>
              )}
            </Card.Content>
          </Card>
        ))}
      </View>
    );
  };

  const renderDetailModal = () => {
    if (!selectedLeave) return null;

    return (
      <Portal>
        <Modal
          visible={detailModalVisible}
          onDismiss={() => setDetailModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>Leave Details</Title>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailValue}>
              {selectedLeave.startDate === selectedLeave.endDate
                ? selectedLeave.startDate
                : `${selectedLeave.startDate} - ${selectedLeave.endDate}`}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Chip
              mode="outlined"
              style={[styles.statusChip, { borderColor: getStatusColor(selectedLeave.status) }]}
              textStyle={{ color: getStatusColor(selectedLeave.status) }}
            >
              {selectedLeave.status}
            </Chip>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reason:</Text>
            <Text style={styles.detailValue}>{selectedLeave.reason}</Text>
          </View>

          {selectedLeave.approvedBy && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Approved By:</Text>
              <Text style={styles.detailValue}>{selectedLeave.approvedBy}</Text>
            </View>
          )}

          {selectedLeave.remarks && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Remarks:</Text>
              <Text style={styles.detailValue}>{selectedLeave.remarks}</Text>
            </View>
          )}

          {selectedLeave.documents.length > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Attachments:</Text>
              <View style={styles.documentList}>
                {selectedLeave.documents.map((doc, index) => (
                  <Button
                    key={index}
                    mode="outlined"
                    icon={({ size, color }) => (
                      <MaterialCommunityIcons 
                        name="file-document" 
                        size={size} 
                        color={color} 
                      />
                    )}
                    onPress={() => {
                      // Handle document viewing
                    }}
                    style={styles.documentButton}
                  >
                    {doc}
                  </Button>
                ))}
              </View>
            </View>
          )}

          <Button
            mode="contained"
            icon={({ size, color }) => (
              <MaterialCommunityIcons 
                name="close" 
                size={size} 
                color={color} 
              />
            )}
            onPress={() => setDetailModalVisible(false)}
            style={styles.closeButton}
          >
            Close
          </Button>
        </Modal>
      </Portal>
    );
  };

  return (
    <View style={styles.container}>
      {renderChildSelector()}
      <ScrollView>
        {renderLeaveList()}
      </ScrollView>
      {renderDetailModal()}
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
  leaveList: {
    padding: 16,
  },
  leaveCard: {
    marginBottom: 16,
    elevation: 2,
  },
  leaveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dates: {
    fontSize: 16,
  },
  duration: {
    fontSize: 12,
    opacity: 0.6,
  },
  statusChip: {
    height: 24,
  },
  reason: {
    marginTop: 8,
  },
  attachments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  attachmentText: {
    marginLeft: 4,
    fontSize: 12,
    opacity: 0.8,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  modalTitle: {
    marginBottom: 16,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
  },
  documentList: {
    marginTop: 8,
  },
  documentButton: {
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 16,
  },
});

export default LeaveHistory;