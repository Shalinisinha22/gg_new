import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Divider, FAB, List, Modal, Paragraph, Portal, Searchbar, TextInput, Title, useTheme } from 'react-native-paper';
import { useLanguage } from '../../i18n/LanguageContext';
import theme from "../../constants/Theme"
const AdminMessages = () => {
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  const showModal = (message = null) => {
    setSelectedMessage(message);
    setVisible(true);
  };
  const hideModal = () => {
    setSelectedMessage(null);
    setSelectedRecipients([]);
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
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginVertical: 8,
    },
    chip: {
      marginRight: 8,
      marginBottom: 8,
    },
    messagePreview: {
      backgroundColor: theme.Colors.background,
      padding: 8,
      borderRadius: 4,
      marginTop: 8,
    },
  });

  // Mock data
  const messages = [
    {
      id: '1',
      title: 'Holiday Notice',
      content: 'The hostel will be closed for maintenance from 15th to 20th July.',
      recipients: ['students', 'parents'],
      timestamp: '2023-07-01 10:30',
    },
    {
      id: '2',
      title: 'Staff Meeting',
      content: 'Monthly staff meeting scheduled for tomorrow at 10 AM.',
      recipients: ['teachers', 'wardens'],
      timestamp: '2023-07-02 09:15',
    },
  ];

  const recipientOptions = [
    { id: 'students', label: t('admin.messages.students') },
    { id: 'parents', label: t('admin.messages.parents') },
    { id: 'teachers', label: t('admin.messages.teachers') },
    { id: 'wardens', label: t('admin.messages.wardens') },
  ];

  const toggleRecipient = (recipientId) => {
    if (selectedRecipients.includes(recipientId)) {
      setSelectedRecipients(selectedRecipients.filter(id => id !== recipientId));
    } else {
      setSelectedRecipients([...selectedRecipients, recipientId]);
    }
  };

  const MessageForm = () => (
    <>
      <TextInput
        style={styles.input}
        label={t('admin.messages.title')}
        value={selectedMessage?.title || ''}
        mode="outlined"
      />
      <TextInput
        style={styles.input}
        label={t('admin.messages.content')}
        value={selectedMessage?.content || ''}
        mode="outlined"
        multiline
        numberOfLines={4}
      />
      <Title style={{ marginTop: 16, marginBottom: 8 }}>
        {t('admin.messages.recipients')}
      </Title>
      <View style={styles.chipContainer}>
        {recipientOptions.map((recipient) => (
          <Chip
            key={recipient.id}
            selected={selectedRecipients.includes(recipient.id)}
            onPress={() => toggleRecipient(recipient.id)}
            style={styles.chip}
          >
            {recipient.label}
          </Chip>
        ))}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={t('admin.messages.search')}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <List.Section>
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                  <List.Item
                    title={message.title}
                    description={message.content}
                    left={props => <List.Icon {...props} icon="message-text" />}
                    right={props => (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                          {...props}
                          onPress={() => showModal(message)}
                        >
                          {t('admin.messages.edit')}
                        </Button>
                      </View>
                    )}
                  />
                  <View style={styles.chipContainer}>
                    {message.recipients.map((recipient) => (
                      <Chip
                        key={recipient}
                        style={styles.chip}
                        small
                      >
                        {t(`admin.messages.${recipient}`)}
                      </Chip>
                    ))}
                  </View>
                  <Paragraph style={{ marginLeft: 72, marginBottom: 8 }}>
                    {message.timestamp}
                  </Paragraph>
                  <Divider />
                </React.Fragment>
              ))}
            </List.Section>
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
            {selectedMessage
              ? t('admin.messages.editMessage')
              : t('admin.messages.newMessage')}
          </Title>
          <MessageForm />
          <Button
            mode="contained"
            onPress={hideModal}
            style={{ marginTop: 16 }}
          >
            {selectedMessage
              ? t('admin.messages.saveChanges')
              : t('admin.messages.send')}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default AdminMessages;