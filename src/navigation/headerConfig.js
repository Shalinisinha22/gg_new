import { Platform } from 'react-native';

export const createHeaderConfig = (theme) => {
  if (!theme || !theme.colors) {
    console.warn('Theme is undefined or invalid in createHeaderConfig:', theme);
  }

  return {
    headerStyle: {
      backgroundColor: theme?.colors?.headerBackground ?? '#FF0000',
    },
    headerTintColor: theme?.colors?.headerText ?? '#FFFFFF',
    headerTitleStyle: {
      fontFamily: theme?.fonts?.medium ?? 'System',
      fontSize: 18,
    },
  };
};
