import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, HeaderBar } from '../../components/StyledComponents';
import { borderRadius, Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Profile = () => {
  const { t } = useLanguage();

  const profileData = {
    name: 'Admin User',
    role: 'System Administrator',
    email: 'admin@school.edu',
    phone: '+1 234 567 8900',
    lastLogin: '2024-01-20 09:30 AM',
    accountCreated: '2023-01-01',
  };

  const stats = [
    { label: t('totalUsers'), value: '1.2K' },
    { label: t('activeUsers'), value: '850' },
    { label: t('pendingTasks'), value: '12' },
    { label: t('systemHealth'), value: '98%' },
  ];

  return (
    <View style={styles.container}>
      <HeaderBar title={t('profile')} />
      
      <ScrollView style={styles.content}>
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={require('../../assets/student-avatar.svg')}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{profileData.name}</Text>
              <Text style={styles.role}>{profileData.role}</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>{t('accountInfo')}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('email')}</Text>
            <Text style={styles.infoValue}>{profileData.email}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('phone')}</Text>
            <Text style={styles.infoValue}>{profileData.phone}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('lastLogin')}</Text>
            <Text style={styles.infoValue}>{profileData.lastLogin}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('accountCreated')}</Text>
            <Text style={styles.infoValue}>{profileData.accountCreated}</Text>
          </View>
        </Card>

        <Card style={styles.securityCard}>
          <Text style={styles.sectionTitle}>{t('security')}</Text>
          
          <Button
            title={t('changePassword')}
            variant="secondary"
            style={styles.actionButton}
          />
          
          <Button
            title={t('enable2FA')}
            variant="primary"
            style={styles.actionButton}
          />
        </Card>

        <Card style={styles.preferencesCard}>
          <Text style={styles.sectionTitle}>{t('preferences')}</Text>
          
          <Button
            title={t('editProfile')}
            variant="secondary"
            style={styles.actionButton}
          />
          
          <Button
            title={t('notificationSettings')}
            variant="primary"
            style={styles.actionButton}
          />
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.sm,
  },
  profileCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
    backgroundColor: Colors.primary,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.buttonText,
    marginBottom: spacing.xs,
  },
  role: {
    fontSize: 16,
    color: Colors.buttonText,
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.buttonText,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.buttonText,
    opacity: 0.8,
  },
  detailsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  securityCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  preferencesCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  actionButton: {
    marginBottom: spacing.sm,
  },
});

export default Profile;