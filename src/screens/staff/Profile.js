import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, HeaderBar } from '../../components/StyledComponents';
import { borderRadius, Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Profile = () => {
  const { t } = useLanguage();

  const profileData = {
    name: 'Professor Smith',
    designation: 'Senior Mathematics Teacher',
    department: 'Mathematics',
    employeeId: 'EMP001',
    email: 'smith@school.edu',
    phone: '+1 234 567 8900',
    joinDate: '01/01/2020',
  };

  const stats = [
    { label: t('experience'), value: '10+ years' },
    { label: t('classes'), value: '8' },
    { label: t('students'), value: '240' },
    { label: t('rating'), value: '4.8★' },
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
              <Text style={styles.designation}>{profileData.designation}</Text>
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
          <Text style={styles.sectionTitle}>{t('personalInfo')}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('department')}</Text>
            <Text style={styles.infoValue}>{profileData.department}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('employeeId')}</Text>
            <Text style={styles.infoValue}>{profileData.employeeId}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('email')}</Text>
            <Text style={styles.infoValue}>{profileData.email}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('phone')}</Text>
            <Text style={styles.infoValue}>{profileData.phone}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('joinDate')}</Text>
            <Text style={styles.infoValue}>{profileData.joinDate}</Text>
          </View>
        </Card>

        <Card style={styles.actionsCard}>
          <Button
            title={t('editProfile')}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title={t('changePassword')}
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
  designation: {
    fontSize: 16,
    color: Colors.buttonText,
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
  },
  statItem: {
    alignItems: 'center',
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
  actionsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  actionButton: {
    marginBottom: spacing.xs,
  },
});

export default Profile;