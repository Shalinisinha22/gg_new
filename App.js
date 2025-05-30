import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from './src/i18n/LanguageContext';
import AppNavigator from './src/navigation/AppNavigator';
import {theme,navigationTheme} from './src/constants/Theme';
import { Provider as PaperProvider } from 'react-native-paper';




const App = () => {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <PaperProvider theme={theme}>
        <NavigationContainer theme={navigationTheme}>
          <AppNavigator />
        </NavigationContainer>
        </PaperProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
};

export default App;