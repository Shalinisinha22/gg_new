import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Button, Card, Modal, Portal, Text } from 'react-native-paper';

const StudentReports = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const subjects = [
    {
      name: 'Physics',
      scores: [85, 78, 92, 88, 90],
      tests: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'],
      average: 87,
      rank: 5,
      totalStudents: 120,
    },
    {
      name: 'Chemistry',
      scores: [75, 82, 88, 85, 89],
      tests: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'],
      average: 84,
      rank: 8,
      totalStudents: 120,
    },
    {
      name: 'Mathematics',
      scores: [90, 95, 88, 92, 94],
      tests: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'],
      average: 92,
      rank: 3,
      totalStudents: 120,
    },
  ];

  const SubjectCard = ({ subject }) => (
    <Card
      style={styles.subjectCard}
      onPress={() => {
        setSelectedSubject(subject);
        setDetailModalVisible(true);
      }}
    >
      <Card.Content>
        <Text style={styles.subjectName}>{subject.name}</Text>
        <View style={styles.subjectStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{subject.average}%</Text>
            <Text style={styles.statLabel}>Average</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>#{subject.rank}</Text>
            <Text style={styles.statLabel}>Rank</Text>
          </View>
        </View>

        <LineChart
          data={{
            labels: ['T1', 'T2', 'T3', 'T4', 'T5'],
            datasets: [
              {
                data: subject.scores,
              },
            ],
          }}
          width={Dimensions.get('window').width - 80}
          height={120}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(76, 102, 159, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#4c669f',
            },
          }}
          bezier
          style={styles.chart}
        />
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Performance Report</Text>
          <Text style={styles.headerSubtitle}>Academic Year 2023-24</Text>
        </View>

        <View style={styles.overallCard}>
          <Text style={styles.overallTitle}>Overall Performance</Text>
          <View style={styles.overallStats}>
            <View style={styles.overallStatItem}>
              <Text style={styles.overallValue}>87.6%</Text>
              <Text style={styles.overallLabel}>Average</Text>
            </View>
            <View style={styles.overallStatItem}>
              <Text style={styles.overallValue}>#5</Text>
              <Text style={styles.overallLabel}>Class Rank</Text>
            </View>
            <View style={styles.overallStatItem}>
              <Text style={styles.overallValue}>A+</Text>
              <Text style={styles.overallLabel}>Grade</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Subject-wise Performance</Text>
        {subjects.map((subject) => (
          <SubjectCard key={subject.name} subject={subject} />
        ))}
      </ScrollView>

      <Portal>
        <Modal
          visible={detailModalVisible}
          onDismiss={() => setDetailModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedSubject && (
            <ScrollView>
              <Text style={styles.modalTitle}>{selectedSubject.name} Report</Text>
              
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Test Scores</Text>
                {selectedSubject.scores.map((score, index) => (
                  <View key={index} style={styles.testScore}>
                    <Text>{selectedSubject.tests[index]}</Text>
                    <Text style={styles.scoreValue}>{score}%</Text>
                  </View>
                ))}
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Performance Analysis</Text>
                <View style={styles.analysisItem}>
                  <Text>Class Average:</Text>
                  <Text style={styles.analysisValue}>82%</Text>
                </View>
                <View style={styles.analysisItem}>
                  <Text>Your Average:</Text>
                  <Text style={styles.analysisValue}>{selectedSubject.average}%</Text>
                </View>
                <View style={styles.analysisItem}>
                  <Text>Your Rank:</Text>
                  <Text style={styles.analysisValue}>#{selectedSubject.rank} of {selectedSubject.totalStudents}</Text>
                </View>
              </View>

              <Button
                mode="contained"
                onPress={() => setDetailModalVisible(false)}
                style={styles.closeButton}
              >
                Close
              </Button>
            </ScrollView>
          )}
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4c669f',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
  },
  overallCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 4,
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overallStatItem: {
    alignItems: 'center',
  },
  overallValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c669f',
  },
  overallLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
    marginBottom: 8,
  },
  subjectCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 10,
  },
  subjectName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    marginRight: 24,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4c669f',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  testScore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scoreValue: {
    fontWeight: '500',
  },
  analysisItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  analysisValue: {
    fontWeight: '500',
    color: '#4c669f',
  },
  closeButton: {
    marginTop: 16,
    borderRadius: 8,
  },
});

export default StudentReports;