import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LanguageSelection = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelect = async (language) => {
    try {
      setSelectedLanguage(language);
      await AsyncStorage.setItem('userLanguage', language);
      navigation.navigate('RoleSelection');
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const LanguageButton = ({ language, title, icon }) => (
    <TouchableOpacity
      style={[
        styles.languageButton,
        selectedLanguage === language && styles.selectedButton,
      ]}
      onPress={() => handleLanguageSelect(language)}
    >
      <MaterialCommunityIcons
        name={icon}
        size={32}
        color={selectedLanguage === language ? '#ffffff' : '#333333'}
      />
      <Text
        style={[
          styles.languageText,
          selectedLanguage === language && styles.selectedText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Language</Text>
      <Text style={styles.subtitle}>भाषा चुनें</Text>

      <View style={styles.buttonContainer}>
        <LanguageButton
          language="en"
          title="English"
          icon="alphabetical-variant"
        />
        <LanguageButton
          language="hi"
          title="हिंदी"
          icon="alphabetical-variant"
        />
      </View>

      <Text style={styles.note}>
        You can change the language later in settings
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#666666',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 15,
    gap: 15,
  },
  selectedButton: {
    backgroundColor: '#4c669f',
  },
  languageText: {
    fontSize: 20,
    color: '#333333',
    fontWeight: '500',
  },
  selectedText: {
    color: '#ffffff',
  },
  note: {
    marginTop: 30,
    color: '#666666',
    fontSize: 14,
  },
});

export default LanguageSelection;