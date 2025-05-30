import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Input } from '../../components/StyledComponents';
import { Colors, spacing } from '../../constants/Theme';

import { useLanguage } from '../../hooks/useLanguage';

const Login = () => {
  const { t } = useLanguage();
  const navigation = useNavigation();
  const route = useRoute();
  const { role, nextScreen } = route.params;

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!phone || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Here you would typically make an API call to verify credentials
      // For demo, we'll simulate a successful login
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      // Navigate to the appropriate dashboard based on role
      navigation.reset({
        index: 0,
        routes: [{ name: nextScreen }],
      });
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  const handleOTPLogin = () => {
    if (!phone) {
      setError('Please enter your phone number');
      return;
    }
    navigation.navigate('OTPVerification', { phone, role, nextScreen });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name={role === 'admin' ? 'shield-account' : role === 'staff' ? 'teach' : role === 'parent' ? 'account-child' : 'school'} 
          size={80} 
          color={Colors.primary} 
        />
        <Text style={styles.title}>{t(`login.${role}Title`)}</Text>
        <Text style={styles.subtitle}>{t(`login.${role}Subtitle`)}</Text>
      </View>

      <Card style={styles.card}>
        <Input
          placeholder={t('login.phone')}
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            setError('');
          }}
          keyboardType="phone-pad"
          leftIcon="phone"
        />

        <Input
          placeholder={t('login.password')}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          secureTextEntry
          leftIcon="lock"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>{t('login.signIn')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.otpButton} onPress={handleOTPLogin}>
          <Text style={styles.otpButtonText}>{t('login.useOTP')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{t('login.changeRole')}</Text>
        </TouchableOpacity>
      </Card>
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
  card: {
    padding: spacing.lg,
  },
  error: {
    color: Colors.error,
    fontSize: 14,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  loginButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  otpButton: {
    backgroundColor: Colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  otpButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.textLight,
    fontSize: 14,
  },
});

export default Login;