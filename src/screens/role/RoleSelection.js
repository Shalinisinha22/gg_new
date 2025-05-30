import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/StyledComponents';
import { Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const RoleSelection = () => {
  const { t } = useLanguage();
  const navigation = useNavigation();

  const roles = [
    {
      id: 'student',
      icon: 'school',
      nextScreen: 'StudentDashboard',
    },
    {
      id: 'parent',
      icon: 'account-child',
      nextScreen: 'ParentDashboard',
    },
    {
      id: 'staff',
      icon: 'teach',
      nextScreen: 'StaffDashboard',
    },
    {
      id: 'admin',
      icon: 'shield-account',
      nextScreen: 'AdminDashboard',
    },
  ];

  const handleRoleSelect = (role) => {
    navigation.navigate('Login', { 
      role: role.id,
      nextScreen: role.nextScreen,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name="account-group" 
          size={80} 
          color={Colors.primary} 
        />
        <Text style={styles.title}>{t('roleSelection.title')}</Text>
        <Text style={styles.subtitle}>{t('roleSelection.subtitle')}</Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={styles.roleCard}
            onPress={() => handleRoleSelect(role)}
          >
            <Card style={styles.card}>
              <MaterialCommunityIcons
                name={role.icon}
                size={40}
                color={Colors.primary}
              />
              <Text style={styles.roleTitle}>
                {t(`roleSelection.${role.id}Title`)}
              </Text>
              <Text style={styles.roleDescription}>
                {t(`roleSelection.${role.id}Description`)}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  roleCard: {
    width: '48%',
    marginBottom: spacing.md,
  },
  card: {
    padding: spacing.md,
    alignItems: 'center',
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  roleDescription: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});

export default RoleSelection;