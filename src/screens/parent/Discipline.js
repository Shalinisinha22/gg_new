import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Modal, Paragraph, Portal, Text, TextInput, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLanguage } from '../../i18n/LanguageContext';
import theme from "../../constants/Theme"
const ParentDiscipline = () => {

  const { translations } = useLanguage();
  const [selectedChild, setSelectedChild] = useState(0);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [responseText, setResponseText] = useState('');

  // Mock data - Replace with actual API calls
  const children = [
    {
      id: 1,
      name: 'Rahul Kumar',
      class: 'XII-A',
      incidents: [
        {
          id: 1,
          date: '2023-09-05',
          type: 'Behavioral',
          severity: 'Minor',
          description: 'Talking during study hours in hostel',
          reportedBy: 'Mrs. Gupta (Hostel Warden)',
          status: 'Pending Acknowledgment',
          canRespond: true,
        },
        {
          id: 2,
          date: '2023-09-01',
          type: 'Academic',
          severity: 'Moderate',
          description: 'Incomplete homework submission for Physics',
          reportedBy: 'Mr. Sharma (Physics Teacher)',
          status: 'Acknowledged',
          response: 'Will ensure completion of homework on time',
          canRespond: false,
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

  const renderIncidentList = () => {
    const child = children[selectedChild];
    return (
      <View style={styles.incidentList}>
        {child.incidents.map((incident) => (
          <Card
            key={incident.id}
            style={styles.incidentCard}
            onPress={() => {
              setSelectedIncident(incident);
              if (incident.canRespond) {
                setResponseModalVisible(true);
              }
            }}
          >
            <Card.Content>
              <View style={styles.incidentHeader}>
                <Title style={styles.incidentDate}>{incident.date}</Title>
                <Chip
                  mode="outlined"
                  style={[
                    styles.severityChip,
                    {
                      borderColor:
                        incident.severity === 'Minor'
                          ? 'orange'
                          : incident.severity === 'Moderate'
                          ? 'red'
                          : 'darkred',
                    },
                  ]}
                >
                  {incident.severity}
                </Chip>
              </View>

              <View style={styles.incidentType}>
                <Icon
                  name={incident.type === 'Behavioral' ? 'account-alert' : 'book-alert'}
                  size={24}
                  color={theme.Colors.primary}
                />
                <Text style={styles.incidentTypeText}>{incident.type}</Text>
              </View>

              <Paragraph style={styles.description}>{incident.description}</Paragraph>
              <Paragraph style={styles.reportedBy}>Reported by: {incident.reportedBy}</Paragraph>

              <View style={styles.statusContainer}>
                <Icon
                  name={
                    incident.status === 'Acknowledged' ? 'check-circle' : 'clock-outline'
                  }
                  size={20}
                  color={incident.status === 'Acknowledged' ? 'green' : 'orange'}
                />
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: incident.status === 'Acknowledged' ? 'green' : 'orange',
                    },
                  ]}
                >
                  {incident.status}
                </Text>
              </View>

              {incident.response && (
                <View style={styles.responseContainer}>
                  <Title style={styles.responseTitle}>Your Response:</Title>
                  <Paragraph>{incident.response}</Paragraph>
                </View>
              )}

              {incident.canRespond && (
                <Button
                  mode="contained"
                  onPress={() => {
                    setSelectedIncident(incident);
                    setResponseModalVisible(true);
                  }}
                  style={styles.respondButton}
                >
                  Respond
                </Button>
              )}
            </Card.Content>
          </Card>
        ))}
      </View>
    );
  };

  const renderResponseModal = () => {
    if (!selectedIncident) return null;

    return (
      <Portal>
        <Modal
          visible={responseModalVisible}
          onDismiss={() => setResponseModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>Respond to Incident</Title>
          <Paragraph style={styles.modalDescription}>
            {selectedIncident.description}
          </Paragraph>

          <TextInput
            mode="outlined"
            label="Your Response"
            value={responseText}
            onChangeText={setResponseText}
            multiline
            numberOfLines={4}
            style={styles.responseInput}
          />

          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => setResponseModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                // Handle response submission
                setResponseModalVisible(false);
                setResponseText('');
              }}
              style={styles.modalButton}
              disabled={!responseText.trim()}
            >
              Submit
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  };

  return (
    <View style={styles.container}>
      {renderChildSelector()}
      <ScrollView>
        {renderIncidentList()}
      </ScrollView>
      {renderResponseModal()}
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
  incidentList: {
    padding: 16,
  },
  incidentCard: {
    marginBottom: 16,
    elevation: 2,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  incidentDate: {
    fontSize: 16,
  },
  severityChip: {
    height: 24,
  },
  incidentType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  incidentTypeText: {
    marginLeft: 8,
    fontSize: 16,
    opacity: 0.8,
  },
  description: {
    marginBottom: 8,
  },
  reportedBy: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  responseContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  responseTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  respondButton: {
    marginTop: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    marginBottom: 16,
  },
  modalDescription: {
    marginBottom: 16,
    opacity: 0.8,
  },
  responseInput: {
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: 8,
  },
});

export default ParentDiscipline;