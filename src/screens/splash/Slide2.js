import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import Theme from '../../constants/Theme';

const { Colors } = Theme;

const offerings = [
  {
    id: '1',
    title: 'NEET Coaching',
    description: 'Expert guidance for medical aspirants',
  },
  {
    id: '2',
    title: 'IIT-JEE Preparation',
    description: 'Comprehensive training for engineering entrance',
  },
  {
    id: '3',
    title: 'Foundation Courses',
    description: 'Strong base for competitive exams',
  },
  {
    id: '4',
    title: 'Hostel Facilities',
    description: 'Safe and conducive learning environment',
  },
];

const Slide2 = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Slide3');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our Key Offerings</Text>
      <FlatList
        data={offerings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Change to light background
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary, // Change to primary color for contrast
    marginVertical: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    marginVertical: 8,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary, // Add accent color
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.textLight,
  },
});

export default Slide2;