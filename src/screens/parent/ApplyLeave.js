import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Portal, Text, TextInput, Title, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';
import theme from "../../constants/Theme"
const ApplyLeave = ({ navigation, route }) => {

  const { translations } = useLanguage();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState(0);

  // Mock data - Replace with actual API calls
  const children = [
    {
      id: 1,
      name: 'Rahul Kumar',
      class: 'XII-A',
    },
    {
      id: 2,
      name: 'Priya Kumar',
      class: 'X-B',
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

  const renderLeaveForm = () => (
    <Card style={styles.formCard}>
      <Card.Content>
        <Title>Leave Application</Title>

        <TextInput
          mode="outlined"
          label="Start Date"
          value={startDate}
          onChangeText={setStartDate}
          placeholder="YYYY-MM-DD"
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="End Date"
          value={endDate}
          onChangeText={setEndDate}
          placeholder="YYYY-MM-DD"
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Reason for Leave"
          value={reason}
          onChangeText={setReason}
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <Button
          mode="outlined"
          icon="paperclip"
          onPress={() => setAttachmentModalVisible(true)}
          style={styles.attachButton}
        >
          Attach Document
        </Button>

        <Button
          mode="contained"
          onPress={() => {
            // Handle leave application submission
            navigation.goBack();
          }}
          style={styles.submitButton}
          disabled={!startDate || !endDate || !reason}
        >
          Submit Application
        </Button>
      </Card.Content>
    </Card>
  );

  const renderAttachmentModal = () => (
    <Portal>
      <Modal
        visible={attachmentModalVisible}
        onDismiss={() => setAttachmentModalVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <Title style={styles.modalTitle}>Attach Document</Title>

        <Button
          mode="outlined"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="camera" size={size} color={color} />
          )}
          onPress={() => {
            // Handle camera capture
            setAttachmentModalVisible(false);
          }}
          style={styles.modalButton}
        >
          Take Photo
        </Button>

        <Button
          mode="outlined"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="image" size={size} color={color} />
          )}
          onPress={() => {
            // Handle gallery selection
            setAttachmentModalVisible(false);
          }}
          style={styles.modalButton}
        >
          Choose from Gallery
        </Button>

        <Button
          mode="outlined"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="file" size={size} color={color} />
          )}
          onPress={() => {
            // Handle document selection
            setAttachmentModalVisible(false);
          }}
          style={styles.modalButton}
        >
          Choose Document
        </Button>

        <Button
          mode="contained"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="close" size={size} color={color} />
          )}
          onPress={() => setAttachmentModalVisible(false)}
          style={styles.modalButton}
        >
          Cancel
        </Button>
      </Modal>
    </Portal>
  );

  const renderGuidelines = () => (
    <Card style={styles.guidelinesCard}>
      <Card.Content>
        <Title>Leave Application Guidelines</Title>
        <View style={styles.guideline}>
          <MaterialCommunityIcons 
            name="information" 
            size={20} 
            color={theme.Colors.primary} 
          />
          <Text style={styles.guidelineText}>
            Submit application at least 2 days in advance
          </Text>
        </View>
        <View style={styles.guideline}>
          <MaterialCommunityIcons 
            name="information" 
            size={20} 
            color={theme.Colors.primary} 
          />
          <Text style={styles.guidelineText}>
            Attach supporting documents for medical leave
          </Text>
        </View>
        <View style={styles.guideline}>
          <MaterialCommunityIcons 
            name="information" 
            size={20} 
            color={theme.Colors.primary} 
          />
          <Text style={styles.guidelineText}>
            Maximum 3 days leave without documents
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      {renderChildSelector()}
      {renderGuidelines()}
      {renderLeaveForm()}
      {renderAttachmentModal()}
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
  guidelinesCard: {
    margin: 16,
    elevation: 2,
  },
  guideline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  guidelineText: {
    marginLeft: 8,
    flex: 1,
  },
  formCard: {
    margin: 16,
    elevation: 2,
  },
  input: {
    marginBottom: 16,
  },
  attachButton: {
    marginBottom: 16,
  },
  submitButton: {
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
  modalButton: {
    marginBottom: 8,
  },
});

export default ApplyLeave;