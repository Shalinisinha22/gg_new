import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, DataTable, FAB, Modal, Portal, Searchbar, SegmentedButtons, TextInput, Title, useTheme } from 'react-native-paper';
import { useLanguage } from '../../i18n/LanguageContext';
import theme from "../../constants/Theme"
const AdminStaff = () => {
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffType, setStaffType] = useState('teacher');

  const showModal = (staff = null) => {
    setSelectedStaff(staff);
    setVisible(true);
  };
  const hideModal = () => {
    setSelectedStaff(null);
    setVisible(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.Colors.background,
    },
    searchbar: {
      margin: 16,
    },
    segmentedButtons: {
      marginHorizontal: 16,
      marginBottom: 16,
    },
    card: {
      margin: 16,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    modal: {
      backgroundColor: theme.Colors.surface,
      padding: 20,
      margin: 20,
      borderRadius: 8,
    },
    input: {
      marginVertical: 8,
    },
  });

  // Mock staff data
  const staffMembers = [
    { id: '1', name: 'Dr. Robert Wilson', role: 'teacher', subject: 'Mathematics', contact: '+1234567890' },
    { id: '2', name: 'Mrs. Sarah Brown', role: 'teacher', subject: 'Science', contact: '+1234567891' },
    { id: '3', name: 'Mr. James Davis', role: 'warden', block: 'Block A', contact: '+1234567892' },
  ];

  const StaffForm = () => (
    <>
      <TextInput
        style={styles.input}
        label={t('admin.staff.name')}
        value={selectedStaff?.name || ''}
        mode="outlined"
      />
      <SegmentedButtons
        value={staffType}
        onValueChange={setStaffType}
        buttons={[
          { value: 'teacher', label: t('admin.staff.teacher') },
          { value: 'warden', label: t('admin.staff.warden') },
          { value: 'staff', label: t('admin.staff.otherStaff') },
        ]}
        style={styles.input}
      />
      {staffType === 'teacher' && (
        <TextInput
          style={styles.input}
          label={t('admin.staff.subject')}
          value={selectedStaff?.subject || ''}
          mode="outlined"
        />
      )}
      {staffType === 'warden' && (
        <TextInput
          style={styles.input}
          label={t('admin.staff.block')}
          value={selectedStaff?.block || ''}
          mode="outlined"
        />
      )}
      <TextInput
        style={styles.input}
        label={t('admin.staff.contact')}
        value={selectedStaff?.contact || ''}
        mode="outlined"
        keyboardType="phone-pad"
      />
    </>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={t('admin.staff.search')}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <SegmentedButtons
        value={staffType}
        onValueChange={setStaffType}
        buttons={[
          { value: 'teacher', label: t('admin.staff.teacher') },
          { value: 'warden', label: t('admin.staff.warden') },
          { value: 'staff', label: t('admin.staff.otherStaff') },
        ]}
        style={styles.segmentedButtons}
      />

      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>{t('admin.staff.name')}</DataTable.Title>
                {staffType === 'teacher' && (
                  <DataTable.Title>{t('admin.staff.subject')}</DataTable.Title>
                )}
                {staffType === 'warden' && (
                  <DataTable.Title>{t('admin.staff.block')}</DataTable.Title>
                )}
                <DataTable.Title>{t('admin.staff.contact')}</DataTable.Title>
                <DataTable.Title>{t('admin.staff.actions')}</DataTable.Title>
              </DataTable.Header>

              {staffMembers
                .filter((staff) => staff.role === staffType)
                .map((staff) => (
                  <DataTable.Row key={staff.id}>
                    <DataTable.Cell>{staff.name}</DataTable.Cell>
                    {staffType === 'teacher' && (
                      <DataTable.Cell>{staff.subject}</DataTable.Cell>
                    )}
                    {staffType === 'warden' && (
                      <DataTable.Cell>{staff.block}</DataTable.Cell>
                    )}
                    <DataTable.Cell>{staff.contact}</DataTable.Cell>
                    <DataTable.Cell>
                      <Button
                        icon="pencil"
                        mode="text"
                        onPress={() => showModal(staff)}
                      >
                        {t('admin.staff.edit')}
                      </Button>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => showModal()}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <Title>
            {selectedStaff
              ? t('admin.staff.editStaff')
              : t('admin.staff.addStaff')}
          </Title>
          <StaffForm />
          <Button
            mode="contained"
            onPress={hideModal}
            style={{ marginTop: 16 }}
          >
            {selectedStaff
              ? t('admin.staff.saveChanges')
              : t('admin.staff.addStaff')}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default AdminStaff;