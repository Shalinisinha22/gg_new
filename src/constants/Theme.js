
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { MD3LightTheme } from 'react-native-paper';
import { Platform } from 'react-native';
const Colors = {
  primary: '#FF0000',
  secondary: '#FFD700',
  background: '#FFFFFF',
  surface: '#FFF5F5',
  text: '#1A1A1A',
  textLight: '#4A4A4A',
  disabled: '#9E9E9E',
  error: '#DC2626',
  success: '#059669',
  warning: '#F59E0B',
  info: '#3B82F6',
  border: '#E5E5E5',
  cardBackground: '#FFFAFA',
  buttonPrimary: '#FF0000',
  buttonSecondary: '#FFD700',
  buttonText: '#FFFFFF',
  inputBackground: '#FFFFFF',
  inputBorder: '#FFD700',
  tabActive: '#FF0000',
  tabInactive: '#FFD700',
  headerBackground: '#FF0000',
  headerText: '#FFFFFF',
};

const gradients = {
  primary: ['#FF0000', '#FF4D4D'],
  secondary: ['#FFD700', '#FFF066'],
  background: ['#FFFFFF', '#FFF5F5'],
  lightPrimary: ['#FFE5E5', '#FFCCCC'], // Light red gradient
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

const fonts = {
    regular: 'System',
    medium: 'System',
    light: 'System',
    thin: 'System',
  }

const typography = {

   fonts: {
    regular: 'System',
    medium: 'System',
    light: 'System',
    thin: 'System',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
  }
};

const fontConfig = {
  displayLarge: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 57,
    fontWeight: '400',
  },
  displayMedium: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 45,
    fontWeight: '400',
  },
  displaySmall: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 36,
    fontWeight: '400',
  },
  headlineLarge: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 32,
    fontWeight: '400',
  },
  headlineMedium: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 28,
    fontWeight: '400',
  },
  headlineSmall: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 24,
    fontWeight: '400',
  },
  titleLarge: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 22,
    fontWeight: '400',
  },
  titleMedium: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 16,
    fontWeight: '500',
  },
  titleSmall: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 14,
    fontWeight: '500',
  },
  bodyLarge: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 16,
    fontWeight: '400',
  },
  bodyMedium: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 14,
    fontWeight: '400',
  },
  bodySmall: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 12,
    fontWeight: '400',
  },
  labelLarge: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 14,
    fontWeight: '500',
  },
  labelMedium: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 12,
    fontWeight: '500',
  },
  labelSmall: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI',
    }),
    fontSize: 11,
    fontWeight: '500',
  },
};

const customColors = {
  primary: '#6200ee',
  secondary: '#03dac4',
  background: '#f6f6f6',
  surface: '#ffffff',
  text: '#000000',
  error: '#B00020',
};


const Theme = {
  Colors,
  colors: Colors,
  fonts,
  spacing,
  borderRadius,
  shadows,
  typography,
  gradients
};

// Add specific exports for header config
export const defaultHeaderConfig = {
  headerStyle: {
    backgroundColor: Colors.headerBackground,
  },
  headerTintColor: Colors.headerText,
  headerTitleStyle: {
    fontFamily: fonts.medium,
    fontSize: 18,
  },
};

export const navigationTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...customColors,
  },
  fonts: fontConfig,
};

export { Colors, fonts,spacing, borderRadius, shadows, typography,gradients};
export default Theme;