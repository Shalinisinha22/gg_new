import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, IconButton, Menu, useTheme } from 'react-native-paper';
import { useLanguage } from '../i18n/LanguageContext';
import theme from "../../constants/Theme"
const HeaderRight = ({ role }) => {

  const navigation = useNavigation();
  const { t } = useLanguage();
  const [menuVisible, setMenuVisible] = useState(false);
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    badge: {
      position: 'absolute',
      top: -4,
      right: -4,
    },
    menu: {
      marginTop: 40,
    },
  });

  const StudentHeaderRight = () => (
    <View style={styles.container}>
      <View>
        <IconButton
          icon="bell"
          size={24}
          iconColor={theme.Colors.surface}
          onPress={() => navigation.navigate('Notifications')}
        />
        <Badge style={styles.badge} size={16}>3</Badge>
      </View>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <IconButton
            icon="download"
            size={24}
            iconColor={theme.Colors.surface}
            onPress={() => setMenuVisible(true)}
          />
        }
        style={styles.menu}
      >
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate('Downloads', { type: 'pdf' });
          }}
          title={t('header.downloadPDF')}
        />
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate('Downloads', { type: 'receipt' });
          }}
          title={t('header.downloadReceipt')}
        />
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate('Downloads', { type: 'report' });
          }}
          title={t('header.downloadReport')}
        />
      </Menu>
      <Menu
        visible={languageMenuVisible}
        onDismiss={() => setLanguageMenuVisible(false)}
        anchor={
          <IconButton
            icon="web"
            size={24}
            iconColor={theme.Colors.surface}
            onPress={() => setLanguageMenuVisible(true)}
          />
        }
        style={styles.menu}
      >
        <Menu.Item
          onPress={() => {
            setLanguageMenuVisible(false);
            // Handle language change
          }}
          title="English"
        />
        <Menu.Item
          onPress={() => {
            setLanguageMenuVisible(false);
            // Handle language change
          }}
          title="हिंदी"
        />
      </Menu>
    </View>
  );

  const ParentHeaderRight = () => (
    <View style={styles.container}>
      <View>
        <IconButton
          icon="bell"
          size={24}
          iconColor={theme.Colors.surface}
          onPress={() => navigation.navigate('Notifications')}
        />
        <Badge style={styles.badge} size={16}>2</Badge>
      </View>
      <IconButton
        icon="message"
        size={24}
        iconColor={theme.Colors.surface}
        onPress={() => navigation.navigate('ParentMessages')}
      />
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <IconButton
            icon="download"
            size={24}
            iconColor={theme.Colors.surface}
            onPress={() => setMenuVisible(true)}
          />
        }
        style={styles.menu}
      >
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate('Downloads', { type: 'report' });
          }}
          title={t('header.downloadReport')}
        />
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate('Downloads', { type: 'receipt' });
          }}
          title={t('header.downloadReceipt')}
        />
      </Menu>
    </View>
  );

  const AdminHeaderRight = () => (
    <View style={styles.container}>
      <IconButton
        icon="magnify"
        size={24}
        iconColor={theme.Colors.surface}
        onPress={() => navigation.navigate('SearchStudent')}
      />
      <View>
        <IconButton
          icon="bell"
          size={24}
          iconColor={theme.Colors.surface}
          onPress={() => navigation.navigate('Notifications')}
        />
        <Badge style={styles.badge} size={16}>5</Badge>
      </View>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <IconButton
            icon="download"
            size={24}
            iconColor={theme.Colors.surface}
            onPress={() => setMenuVisible(true)}
          />
        }
        style={styles.menu}
      >
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate('Downloads', { type: 'report' });
          }}
          title={t('header.exportReports')}
        />
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate('Downloads', { type: 'fee' });
          }}
          title={t('header.exportFeeLogs')}
        />
      </Menu>
      <IconButton
        icon="cog"
        size={24}
        iconColor={theme.Colors.surface}
        onPress={() => navigation.navigate('AdminSettings')}
      />
    </View>
  );

  const StaffHeaderRight = () => (
    <View style={styles.container}>
      <IconButton
        icon="magnify"
        size={24}
        iconColor={theme.Colors.surface}
        onPress={() => navigation.navigate('SearchStudent')}
      />
      <View>
        <IconButton
          icon="bell"
          size={24}
          iconColor={theme.Colors.surface}
          onPress={() => navigation.navigate('Notifications')}
        />
        <Badge style={styles.badge} size={16}>4</Badge>
      </View>
      <IconButton
        icon="upload"
        size={24}
        iconColor={theme.Colors.surface}
        onPress={() => navigation.navigate('UploadTest')}
      />
    </View>
  );

  switch (role) {
    case 'student':
      return <StudentHeaderRight />;
    case 'parent':
      return <ParentHeaderRight />;
    case 'admin':
      return <AdminHeaderRight />;
    case 'staff':
      return <StaffHeaderRight />;
    default:
      return null;
  }
};

export default HeaderRight;