import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Theme from '../../constants/Theme';

const { Colors, gradients } = Theme;

const Slide3 = () => {
  const navigation = useNavigation();

  const handleProceed = () => {
    navigation.navigate('LanguageSelection');
  };

  return (
    <LinearGradient
      colors={gradients.lightPrimary}  // Using light red gradient
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Your Future Begins Here</Text>
        <Text style={styles.subtitle}>
          Join us on a journey of academic excellence and personal growth
        </Text>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.feature}>✓ Expert Faculty</Text>
          <Text style={styles.feature}>✓ Modern Infrastructure</Text>
          <Text style={styles.feature}>✓ Proven Track Record</Text>
          <Text style={styles.feature}>✓ Holistic Development</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleProceed}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary, // Changed to primary color for contrast
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text, // Changed to regular text color
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  featuresContainer: {
    alignSelf: 'stretch',
    marginBottom: 40,
  },
  feature: {
    fontSize: 18,
    color: Colors.text, // Changed to regular text color
    marginVertical: 8,
    paddingLeft: 20,
  },
  button: {
    backgroundColor: Colors.primary, // Changed to primary color
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.headerText, // Changed to white text
  },
});

export default Slide3;