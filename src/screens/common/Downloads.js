import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Chip, IconButton, Paragraph, SegmentedButtons, Title, useTheme } from 'react-native-paper';
import { useLanguage } from '../../hooks/useLanguage';
import theme from "../../constants/Theme"
const Downloads = () => {

  const { t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState('all');

  const [documents] = useState([
    {
      id: '1',
      title: 'Fee Receipt - March 2024',
      type: 'receipt',
      date: '2024-02-25',
      size: '156 KB',
      category: 'fee',
    },
    {
      id: '2',
      title: 'Progress Report - Term 1',
      type: 'report',
      date: '2024-02-20',
      size: '2.1 MB',
      category: 'academic',
    },
    {
      id: '3',
      title: 'Holiday Calendar 2024',
      type: 'calendar',
      date: '2024-01-15',
      size: '890 KB',
      category: 'general',
    },
    {
      id: '4',
      title: 'Exam Schedule - March 2024',
      type: 'schedule',
      date: '2024-02-22',
      size: '245 KB',
      category: 'academic',
    },
  ]);

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'receipt':
        return 'receipt';
      case 'report':
        return 'file-document';
      case 'calendar':
        return 'calendar';
      case 'schedule':
        return 'clock-outline';
      default:
        return 'file';
    }
  };

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Academic', value: 'academic' },
    { label: 'Fee', value: 'fee' },
    { label: 'General', value: 'general' },
  ];

  const filteredDocuments = documents.filter(doc =>
    selectedCategory === 'all' ? true : doc.category === selectedCategory
  );

  const handleDownload = (document) => {
    // Implement download functionality
    console.log('Downloading:', document.title);
  };

  const renderDocument = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <IconButton
              icon={getDocumentIcon(item.type)}
              size={24}
              color={theme.Colors.primary}
            />
            <View style={styles.textContainer}>
              <Title style={styles.title}>{item.title}</Title>
              <View style={styles.detailsRow}>
                <Paragraph style={styles.date}>{item.date}</Paragraph>
                <Chip style={styles.sizeChip}>{item.size}</Chip>
              </View>
            </View>
          </View>
          <IconButton
            icon="download"
            size={24}
            color={theme.Colors.primary}
            onPress={() => handleDownload(item)}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        buttons={categories}
        style={styles.segmentedButtons}
      />
      <FlatList
        data={filteredDocuments}
        renderItem={renderDocument}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  segmentedButtons: {
    margin: 16,
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    marginBottom: 8,
    elevation: 2,
  },
  cardContent: {
    padding: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  sizeChip: {
    height: 24,
  },
  separator: {
    height: 8,
  },
});

export default Downloads;