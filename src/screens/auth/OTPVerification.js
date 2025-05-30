import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/StyledComponents';
import { Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const OTPVerification = () => {
  const { t } = useLanguage();
  const navigation = useNavigation();
  const route = useRoute();
  const { phone, role, nextScreen } = route.params;

  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError('');

    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      setError('Please enter complete OTP');
      return;
    }

    try {
      // Here you would typically make an API call to verify OTP
      // For demo, we'll simulate a successful verification
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      // Navigate to the appropriate dashboard based on role
      navigation.reset({
        index: 0,
        routes: [{ name: nextScreen }],
      });
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Verification failed. Please try again.');
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
    setOtp(['', '', '', '']);
    setError('');
    // Here you would typically make an API call to resend OTP
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name="message-lock" 
          size={80} 
          color={Colors.primary} 
        />
        <Text style={styles.title}>{t('otp.title')}</Text>
        <Text style={styles.subtitle}>
          {t('otp.subtitle', { phone: phone })}
        </Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity 
          style={styles.verifyButton} 
          onPress={handleVerifyOTP}
        >
          <Text style={styles.verifyButtonText}>{t('otp.verify')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.resendButton, { opacity: timer > 0 ? 0.5 : 1 }]}
          onPress={handleResendOTP}
          disabled={timer > 0}
        >
          <Text style={styles.resendButtonText}>
            {timer > 0 
              ? t('otp.resendIn', { seconds: timer })
              : t('otp.resend')
            }
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{t('otp.back')}</Text>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.lg,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: Colors.surface,
  },
  error: {
    color: Colors.error,
    fontSize: 14,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: Colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  verifyButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    backgroundColor: Colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  resendButtonText: {
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

export default OTPVerification;