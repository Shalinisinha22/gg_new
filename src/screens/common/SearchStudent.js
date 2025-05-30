import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Card, Chip, IconButton, Modal, Paragraph, Portal, Searchbar, Title, useTheme } from 'react-native-paper';
import { useLanguage } from '../../hooks/useLanguage';
import theme from "../../constants/Theme"
const SearchStudent = () => {

  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [students] = useState([
    {
      id: '1',
      name: 'Rahul Kumar',
      rollNo: 'GI2024001',
      class: 'Class X-A',
      hostelRoom: 'Block A - 101',
      attendance: '95%',
      feeStatus: 'Paid',
      parentName: 'Rajesh Kumar',
      parentContact: '+91 9876543210',
    },
    {
      id: '2',
      name: 'Priya Singh',
      rollNo: 'GI2024002',
      class: 'Class IX-B',
      hostelRoom: 'Block B - 205',
      attendance: '92%',
      feeStatus: 'Due',
      parentName: 'Amit Singh',
      parentContact: '+91 9876543211',
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      rollNo: 'GI2024003',
      class: 'Class XI-A',
      hostelRoom: 'Block A - 304',
      attendance: '88%',
      feeStatus: 'Paid',
      parentName: 'Imran Ali',
      parentContact: '+91 9876543212',
    },
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showStudentDetails = (student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const renderStudent = ({ item }) => (
    <Card style={styles.card} onPress={() => showStudentDetails(item)}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.studentInfo}>
          <Avatar.Text
            size={40}
            label={item.name.split(' ').map(n => n[0]).join('')}
            backgroundColor={theme.Colors.primary}
          />
          <View style={styles.details}>
            <Title style={styles.name}>{item.name}</Title>
            <View style={styles.infoRow}>
              <Paragraph style={styles.rollNo}>{item.rollNo}</Paragraph>
              <Chip style={styles.classChip}>{item.class}</Chip>
            </View>
          </View>
          <IconButton
            icon="chevron-right"
            size={24}
            color={theme.Colors.primary}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={t('Search by name or roll number')}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={filteredStudents}
        renderItem={renderStudent}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedStudent && (
            <View>
              <Title style={styles.modalTitle}>{selectedStudent.name}</Title>
              <View style={styles.modalContent}>
                <View style={styles.modalRow}>
                  <Paragraph style={styles.label}>Roll No:</Paragraph>
                  <Paragraph>{selectedStudent.rollNo}</Paragraph>
                </View>
                <View style={styles.modalRow}>
                  <Paragraph style={styles.label}>Class:</Paragraph>
                  <Paragraph>{selectedStudent.class}</Paragraph>
                </View>
                <View style={styles.modalRow}>
                  <Paragraph style={styles.label}>Hostel Room:</Paragraph>
                  <Paragraph>{selectedStudent.hostelRoom}</Paragraph>
                </View>
                <View style={styles.modalRow}>
                  <Paragraph style={styles.label}>Attendance:</Paragraph>
                  <Chip
                    style={[styles.chip, { backgroundColor: parseInt(selectedStudent.attendance) >= 90 ? '#4caf50' : '#ff9800' }]}
                    textStyle={styles.chipText}
                  >
                    {selectedStudent.attendance}
                  </Chip>
                </View>
                <View style={styles.modalRow}>
                  <Paragraph style={styles.label}>Fee Status:</Paragraph>
                  <Chip
                    style={[styles.chip, { backgroundColor: selectedStudent.feeStatus === 'Paid' ? '#4caf50' : '#f44336' }]}
                    textStyle={styles.chipText}
                  >
                    {selectedStudent.feeStatus}
                  </Chip>
                </View>
                <View style={styles.divider} />
                <Title style={styles.sectionTitle}>Parent Information</Title>
                <View style={styles.modalRow}>
                  <Paragraph style={styles.label}>Name:</Paragraph>
                  <Paragraph>{selectedStudent.parentName}</Paragraph>
                </View>
                <View style={styles.modalRow}>
                  <Paragraph style={styles.label}>Contact:</Paragraph>
                  <Paragraph>{selectedStudent.parentContact}</Paragraph>
                </View>
              </View>
            </View>
          )}
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
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    marginBottom: 8,
    elevation: 2,
  },
  cardContent: {
    padding: 8,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rollNo: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  classChip: {
    height: 24,
  },
  separator: {
    height: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  modalContent: {
    gap: 12,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#666',
    fontWeight: 'bold',
  },
  chip: {
    height: 24,
  },
  chipText: {
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
});

export default SearchStudent;