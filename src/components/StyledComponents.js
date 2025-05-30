import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { borderRadius, Colors, shadows, spacing } from '../constants/Theme';

export const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

export const Button = ({ onPress, title, variant = 'primary', style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.button,
      variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary,
      style,
    ]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export const Input = ({ style, ...props }) => (
  <TextInput
    style={[styles.input, style]}
    placeholderTextColor={Colors.textLight}
    {...props}
  />
);

export const HeaderBar = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.sm,
    ...shadows.md,
  },
  button: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  buttonPrimary: {
    backgroundColor: Colors.buttonPrimary,
  },
  buttonSecondary: {
    backgroundColor: Colors.buttonSecondary,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: Colors.text,
  },
  header: {
    backgroundColor: Colors.headerBackground,
    padding: spacing.md,
    paddingTop: spacing.xl,
    ...shadows.lg,
  },
  headerText: {
    color: Colors.headerText,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});