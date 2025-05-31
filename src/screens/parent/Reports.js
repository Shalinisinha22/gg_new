import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Button, Card, Modal, Paragraph, Portal, Text, Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';
import theme from "../../constants/Theme";

const ParentReports = ({ navigation }) => {

  const { translations } = useLanguage();
  const [selectedChild, setSelectedChild] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // Mock data - Replace with actual API calls
  const children = [
    {
      id: 1,
      name: 'Rahul Kumar',
      class: 'XII-A',
      overallScore: 85,
      subjects: [
        {
          name: 'Physics',
          score: 88,
          tests: [
            { name: 'Unit Test 1', score: 85 },
            { name: 'Mid Term', score: 88 },
            { name: 'Unit Test 2', score: 90 },
            { name: 'Final Term', score: 89 },
          ],
        },
        {
          name: 'Chemistry',
          score: 82,
          tests: [
            { name: 'Unit Test 1', score: 80 },
            { name: 'Mid Term', score: 82 },
            { name: 'Unit Test 2', score: 85 },
            { name: 'Final Term', score: 81 },
          ],
        },
        {
          name: 'Mathematics',
          score: 90,
          tests: [
            { name: 'Unit Test 1', score: 88 },
            { name: 'Mid Term', score: 90 },
            { name: 'Unit Test 2', score: 92 },
            { name: 'Final Term', score: 90 },
          ],
        },
      ],
    },
    // Add more children here
  ];

  const renderChildSelector = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.childSelector}
    >
      {children.map((child, index) => (
        <Button
          key={child.id}
          mode={selectedChild === index ? 'contained' : 'outlined'}
          onPress={() => setSelectedChild(index)}
          style={styles.childButton}
        >
          {child.name}
        </Button>
      ))}
    </ScrollView>
  );

  const renderOverallPerformance = () => {
    const child = children[selectedChild];
    return (
      <Card style={styles.overallCard}>
        <Card.Content>
          <Title>Overall Performance</Title>
          <View style={styles.scoreContainer}>
            <MaterialCommunityIcons
              name="school"
              size={48}
              color={theme.Colors.primary}
              style={styles.scoreIcon}
            />
            <View>
              <Title style={styles.scoreText}>{child.overallScore}%</Title>
              <Paragraph>Class Average: 82%</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderSubjectCards = () => {
    const child = children[selectedChild];
    return (
      <View style={styles.subjectsContainer}>
        {child.subjects.map((subject) => (
          <Card
            key={subject.name}
            style={styles.subjectCard}
            onPress={() => {
              setSelectedSubject(subject);
              setDetailModalVisible(true);
            }}
          >
            <Card.Content>
              <Title>{subject.name}</Title>
              <View style={styles.subjectScoreContainer}>
                <Title style={styles.subjectScore}>{subject.score}%</Title>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={theme.Colors.primary}
                />
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    );
  };

  const renderDetailModal = () => {
    if (!selectedSubject) return null;

    const chartData = {
      labels: selectedSubject.tests.map((test) => test.name),
      datasets: [{
        data: selectedSubject.tests.map((test) => test.score),
      }],
    };

    return (
      <Portal>
        <Modal
          visible={detailModalVisible}
          onDismiss={() => setDetailModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>{selectedSubject.name} Performance</Title>
          
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 80}
            height={220}
            chartConfig={{
              backgroundColor: theme.Colors.surface,
              backgroundGradientFrom: theme.Colors.surface,
              backgroundGradientTo: theme.Colors.surface,
              decimalPlaces: 0,
              color: (opacity = 1) => theme.Colors.primary,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chart}
            bezier
          />

          <View style={styles.testList}>
            {selectedSubject.tests.map((test) => (
              <View key={test.name} style={styles.testItem}>
                <Text>{test.name}</Text>
                <Text style={styles.testScore}>{test.score}%</Text>
              </View>
            ))}
          </View>

          <Button
            mode="contained"
            icon={({ size, color }) => (
              <MaterialCommunityIcons 
                name="close" 
                size={size} 
                color={color} 
              />
            )}
            onPress={() => setDetailModalVisible(false)}
            style={styles.closeButton}
          >
            Close
          </Button>
        </Modal>
      </Portal>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderChildSelector()}
        {renderOverallPerformance()}
        {renderSubjectCards()}
      </ScrollView>
      {renderDetailModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  childSelector: {
    padding: 16,
    flexGrow: 0,
  },
  childButton: {
    marginRight: 8,
  },
  overallCard: {
    margin: 16,
    elevation: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  scoreIcon: {
    marginRight: 16,
  },
  scoreText: {
    fontSize: 32,
    color: theme.Colors.primary,
  },
  subjectsContainer: {
    padding: 16,
  },
  subjectCard: {
    marginBottom: 16,
    elevation: 2,
  },
  subjectScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  subjectScore: {
    color: theme.Colors.primary,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  testList: {
    marginTop: 16,
  },
  testItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  testScore: {
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
  },
});

export default ParentReports;