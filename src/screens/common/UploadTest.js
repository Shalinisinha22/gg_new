import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, List, Modal, Paragraph, Portal, SegmentedButtons, TextInput, Title, useTheme } from 'react-native-paper';
import { useLanguage } from '../../hooks/useLanguage';
import theme from "../../constants/Theme"
const UploadTest = () => {

  const { t } = useLanguage();

  const [testType, setTestType] = useState('unit');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [testDate, setTestDate] = useState('');
  const [maxMarks, setMaxMarks] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);

  const testTypes = [
    { label: 'Unit Test', value: 'unit' },
    { label: 'Mid Term', value: 'midterm' },
    { label: 'Final', value: 'final' },
  ];

  const classes = [
    'Class IX-A', 'Class IX-B',
    'Class X-A', 'Class X-B',
    'Class XI-A', 'Class XI-B',
    'Class XII-A', 'Class XII-B',
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry',
    'Biology', 'English', 'Hindi',
    'Social Science', 'Computer Science',
  ];

  const handleUpload = () => {
    // Implement file upload functionality
    console.log('Uploading test:', {
      testType,
      selectedClass,
      selectedSubject,
      testDate,
      maxMarks,
      selectedFile,
    });
  };

  const handleFilePicker = () => {
    // Implement file picker functionality
    console.log('Opening file picker');
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{t('Upload Test Results')}</Title>

          <View style={styles.section}>
            <Paragraph style={styles.label}>{t('Test Type')}</Paragraph>
            <SegmentedButtons
              value={testType}
              onValueChange={setTestType}
              buttons={testTypes}
              style={styles.segmentedButtons}
            />
          </View>

          <View style={styles.section}>
            <List.Item
              title={selectedClass || t('Select Class')}
              onPress={() => setShowClassModal(true)}
              left={props => <List.Icon {...props} icon="account-group" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              style={styles.listItem}
            />

            <List.Item
              title={selectedSubject || t('Select Subject')}
              onPress={() => setShowSubjectModal(true)}
              left={props => <List.Icon {...props} icon="book" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              style={styles.listItem}
            />
          </View>

          <View style={styles.section}>
            <TextInput
              label={t('Test Date')}
              value={testDate}
              onChangeText={setTestDate}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label={t('Maximum Marks')}
              value={maxMarks}
              onChangeText={setMaxMarks}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <View style={styles.fileSection}>
            <Title style={styles.subtitle}>{t('Upload File')}</Title>
            <Paragraph style={styles.fileInfo}>
              {t('Supported formats: Excel, CSV (Max size: 5MB)')}
            </Paragraph>
            {selectedFile ? (
              <View style={styles.selectedFile}>
                <IconButton icon="file" size={24} />
                <Paragraph style={styles.fileName}>{selectedFile.name}</Paragraph>
                <IconButton
                  icon="close"
                  size={20}
                  onPress={() => setSelectedFile(null)}
                />
              </View>
            ) : (
              <Button
                mode="outlined"
                icon="upload"
                onPress={handleFilePicker}
                style={styles.uploadButton}
              >
                {t('Choose File')}
              </Button>
            )}
          </View>

          <Button
            mode="contained"
            onPress={handleUpload}
            style={styles.submitButton}
            disabled={!selectedClass || !selectedSubject || !testDate || !maxMarks || !selectedFile}
          >
            {t('Upload Test Results')}
          </Button>
        </Card.Content>
      </Card>

      <Portal>
        <Modal
          visible={showClassModal}
          onDismiss={() => setShowClassModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>{t('Select Class')}</Title>
          {classes.map((className) => (
            <List.Item
              key={className}
              title={className}
              onPress={() => {
                setSelectedClass(className);
                setShowClassModal(false);
              }}
              right={props =>
                selectedClass === className && <List.Icon {...props} icon="check" />
              }
            />
          ))}
        </Modal>

        <Modal
          visible={showSubjectModal}
          onDismiss={() => setShowSubjectModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>{t('Select Subject')}</Title>
          {subjects.map((subject) => (
            <List.Item
              key={subject}
              title={subject}
              onPress={() => {
                setSelectedSubject(subject);
                setShowSubjectModal(false);
              }}
              right={props =>
                selectedSubject === subject && <List.Icon {...props} icon="check" />
              }
            />
          ))}
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  segmentedButtons: {
    marginTop: 8,
  },
  listItem: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 4,
  },
  input: {
    marginBottom: 16,
  },
  fileSection: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  fileInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  selectedFile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 8,
  },
  fileName: {
    flex: 1,
    marginHorizontal: 8,
  },
  uploadButton: {
    marginTop: 8,
  },
  submitButton: {
    marginTop: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
});

export default UploadTest;