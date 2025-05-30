import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, List, Modal, Paragraph, Portal, Switch, TextInput, Title, useTheme } from 'react-native-paper';
import { useLanguage } from '../../hooks/useLanguage';
import theme from "../../constants/Theme"
const Settings = () => {

  const { t } = useLanguage();

  const [settings, setSettings] = useState({
    enableNotifications: true,
    enableSMS: true,
    enableEmailAlerts: true,
    enableAutoAttendance: false,
    enableBiometric: true,
    enableOnlinePayments: true,
    enableParentAccess: true,
    enableStudentPortal: true,
    enableHostelModule: true,
    enableTransportModule: false,
  });

  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backupEmail, setBackupEmail] = useState('');

  const toggleSetting = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const handleBackup = () => {
    // Implement backup functionality
    console.log('Backing up to:', backupEmail);
    setShowBackupModal(false);
  };

  const settingsGroups = [
    {
      title: 'Notifications',
      icon: 'bell-outline',
      settings: [
        {
          key: 'enableNotifications',
          title: 'Push Notifications',
          description: 'Enable in-app notifications',
        },
        {
          key: 'enableSMS',
          title: 'SMS Alerts',
          description: 'Send SMS for important updates',
        },
        {
          key: 'enableEmailAlerts',
          title: 'Email Alerts',
          description: 'Send email notifications',
        },
      ],
    },
    {
      title: 'Attendance',
      icon: 'calendar-check',
      settings: [
        {
          key: 'enableAutoAttendance',
          title: 'Auto Attendance',
          description: 'Enable automatic attendance marking',
        },
        {
          key: 'enableBiometric',
          title: 'Biometric Attendance',
          description: 'Use biometric for attendance',
        },
      ],
    },
    {
      title: 'Modules',
      icon: 'view-grid-outline',
      settings: [
        {
          key: 'enableOnlinePayments',
          title: 'Online Payments',
          description: 'Enable online fee payments',
        },
        {
          key: 'enableParentAccess',
          title: 'Parent Portal',
          description: 'Enable parent access portal',
        },
        {
          key: 'enableStudentPortal',
          title: 'Student Portal',
          description: 'Enable student access portal',
        },
        {
          key: 'enableHostelModule',
          title: 'Hostel Management',
          description: 'Enable hostel management features',
        },
        {
          key: 'enableTransportModule',
          title: 'Transport Management',
          description: 'Enable transport management features',
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {settingsGroups.map((group) => (
        <Card key={group.title} style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <List.Icon icon={group.icon} />
              <Title style={styles.sectionTitle}>{t(group.title)}</Title>
            </View>

            {group.settings.map((setting) => (
              <List.Item
                key={setting.key}
                title={t(setting.title)}
                description={t(setting.description)}
                right={() => (
                  <Switch
                    value={settings[setting.key]}
                    onValueChange={() => toggleSetting(setting.key)}
                    color={theme.Colors.primary}
                  />
                )}
                style={styles.listItem}
              />
            ))}
          </Card.Content>
        </Card>
      ))}

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <List.Icon icon="backup-restore" />
            <Title style={styles.sectionTitle}>{t('Backup & Restore')}</Title>
          </View>

          <Paragraph style={styles.backupInfo}>
            {t('Create a backup of your system data and settings. The backup will be sent to the specified email address.')}
          </Paragraph>

          <Button
            mode="contained"
            icon="cloud-upload"
            onPress={() => setShowBackupModal(true)}
            style={styles.backupButton}
          >
            {t('Create Backup')}
          </Button>
        </Card.Content>
      </Card>

      <Portal>
        <Modal
          visible={showBackupModal}
          onDismiss={() => setShowBackupModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>{t('Create Backup')}</Title>
          <Paragraph style={styles.modalDescription}>
            {t('Enter the email address where you want to receive the backup file.')}
          </Paragraph>

          <TextInput
            label={t('Email Address')}
            value={backupEmail}
            onChangeText={setBackupEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => setShowBackupModal(false)}
              style={styles.modalButton}
            >
              {t('Cancel')}
            </Button>
            <Button
              mode="contained"
              onPress={handleBackup}
              style={styles.modalButton}
              disabled={!backupEmail}
            >
              {t('Create Backup')}
            </Button>
          </View>
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
    marginBottom: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginLeft: 8,
  },
  listItem: {
    paddingVertical: 8,
  },
  backupInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  backupButton: {
    marginTop: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  modalButton: {
    minWidth: 100,
  },
});

export default Settings;