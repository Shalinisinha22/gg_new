import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, DataTable, Modal, Paragraph, Portal, TextInput, Title, useTheme } from 'react-native-paper';
import { useLanguage } from '../../i18n/LanguageContext';
import theme from "../../constants/Theme"
const AdminHostel = () => {
  const { t } = useLanguage();

  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const showModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setVisible(true);
  };
  const hideModal = () => {
    setModalType(null);
    setSelectedItem(null);
    setVisible(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.Colors.background,
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
    statsCard: {
      margin: 8,
      flex: 1,
    },
    statsContainer: {
      flexDirection: 'row',
      padding: 8,
    },
  });

  // Mock data
  const blocks = [
    { id: '1', name: 'Block A', capacity: 100, occupied: 85 },
    { id: '2', name: 'Block B', capacity: 100, occupied: 92 },
  ];

  const rooms = [
    { id: '1', block: 'Block A', number: '101', capacity: 4, occupied: 3 },
    { id: '2', block: 'Block A', number: '102', capacity: 4, occupied: 4 },
    { id: '3', block: 'Block B', number: '201', capacity: 4, occupied: 3 },
  ];

  const BlockForm = () => (
    <>
      <TextInput
        style={styles.input}
        label={t('admin.hostel.blockName')}
        value={selectedItem?.name || ''}
        mode="outlined"
      />
      <TextInput
        style={styles.input}
        label={t('admin.hostel.capacity')}
        value={selectedItem?.capacity?.toString() || ''}
        mode="outlined"
        keyboardType="numeric"
      />
    </>
  );

  const RoomForm = () => (
    <>
      <TextInput
        style={styles.input}
        label={t('admin.hostel.block')}
        value={selectedItem?.block || ''}
        mode="outlined"
      />
      <TextInput
        style={styles.input}
        label={t('admin.hostel.roomNumber')}
        value={selectedItem?.number || ''}
        mode="outlined"
      />
      <TextInput
        style={styles.input}
        label={t('admin.hostel.capacity')}
        value={selectedItem?.capacity?.toString() || ''}
        mode="outlined"
        keyboardType="numeric"
      />
    </>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.statsContainer}>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Title>{t('admin.hostel.totalCapacity')}</Title>
              <Paragraph>200</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Title>{t('admin.hostel.occupancy')}</Title>
              <Paragraph>88.5%</Paragraph>
            </Card.Content>
          </Card>
        </View>

        <Card style={styles.card}>
          <Card.Title
            title={t('admin.hostel.blocks')}
            right={(props) => (
              <Button
                {...props}
                onPress={() => showModal('block')}
              >
                {t('admin.hostel.addBlock')}
              </Button>
            )}
          />
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>{t('admin.hostel.name')}</DataTable.Title>
                <DataTable.Title numeric>{t('admin.hostel.capacity')}</DataTable.Title>
                <DataTable.Title numeric>{t('admin.hostel.occupied')}</DataTable.Title>
                <DataTable.Title>{t('admin.hostel.actions')}</DataTable.Title>
              </DataTable.Header>

              {blocks.map((block) => (
                <DataTable.Row key={block.id}>
                  <DataTable.Cell>{block.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{block.capacity}</DataTable.Cell>
                  <DataTable.Cell numeric>{block.occupied}</DataTable.Cell>
                  <DataTable.Cell>
                    <Button
                      icon="pencil"
                      mode="text"
                      onPress={() => showModal('block', block)}
                    >
                      {t('admin.hostel.edit')}
                    </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title={t('admin.hostel.rooms')}
            right={(props) => (
              <Button
                {...props}
                onPress={() => showModal('room')}
              >
                {t('admin.hostel.addRoom')}
              </Button>
            )}
          />
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>{t('admin.hostel.block')}</DataTable.Title>
                <DataTable.Title>{t('admin.hostel.roomNumber')}</DataTable.Title>
                <DataTable.Title numeric>{t('admin.hostel.capacity')}</DataTable.Title>
                <DataTable.Title numeric>{t('admin.hostel.occupied')}</DataTable.Title>
                <DataTable.Title>{t('admin.hostel.actions')}</DataTable.Title>
              </DataTable.Header>

              {rooms.map((room) => (
                <DataTable.Row key={room.id}>
                  <DataTable.Cell>{room.block}</DataTable.Cell>
                  <DataTable.Cell>{room.number}</DataTable.Cell>
                  <DataTable.Cell numeric>{room.capacity}</DataTable.Cell>
                  <DataTable.Cell numeric>{room.occupied}</DataTable.Cell>
                  <DataTable.Cell>
                    <Button
                      icon="pencil"
                      mode="text"
                      onPress={() => showModal('room', room)}
                    >
                      {t('admin.hostel.edit')}
                    </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>
      </ScrollView>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <Title>
            {selectedItem
              ? t(`admin.hostel.edit${modalType === 'block' ? 'Block' : 'Room'}`)
              : t(`admin.hostel.add${modalType === 'block' ? 'Block' : 'Room'}`)}
          </Title>
          {modalType === 'block' ? <BlockForm /> : <RoomForm />}
          <Button
            mode="contained"
            onPress={hideModal}
            style={{ marginTop: 16 }}
          >
            {selectedItem
              ? t('admin.hostel.saveChanges')
              : t('admin.hostel.add')}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default AdminHostel;