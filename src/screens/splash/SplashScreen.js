import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/StyledComponents';
import { Colors, spacing } from '../../constants/Theme';
 
import { useLanguage } from '../../hooks/useLanguage';

const SplashScreen = () => {
  const { t } = useLanguage();
  const navigation = useNavigation();

  const features = [
    {
      id: 'academics',
      icon: 'school',
      title: t('splash.academicsTitle'),
      description: t('splash.academicsDescription'),
    },
    {
      id: 'hostel',
      icon: 'home',
      title: t('splash.hostelTitle'),
      description: t('splash.hostelDescription'),
    },
    {
      id: 'attendance',
      icon: 'calendar-check',
      title: t('splash.attendanceTitle'),
      description: t('splash.attendanceDescription'),
    },
    {
      id: 'communication',
      icon: 'message-text',
      title: t('splash.communicationTitle'),
      description: t('splash.communicationDescription'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name="school" 
          size={100} 
          color={Colors.primary} 
        />
        <Text style={styles.title}>{t('appName')}</Text>
        <Text style={styles.tagline}>{t('splashTagline')}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{t('keyOfferings')}</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature) => (
            <Card key={feature.id} style={styles.featureCard}>
              <View style={styles.cardContent}>
                <MaterialCommunityIcons
                  name={feature.icon}
                  size={32}
                  color={Colors.primary}
                />
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </Card>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('futureBegins')}</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('RoleSelection')}
          >
            <Text style={styles.buttonText}>{t('getStarted')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: spacing.lg,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: spacing.sm,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.md,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  footerText: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SplashScreen;