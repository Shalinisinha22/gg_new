import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, HeaderBar, Input } from '../../components/StyledComponents';
import { borderRadius, Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Announcements = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const announcements = [
    {
      id: '1',
      title: 'Annual Day Celebration',
      content: 'Annual Day will be celebrated on 25th January 2024. All students and staff must attend.',
      date: '2024-01-15',
      priority: 'high',
      target: 'all',
    },
    {
      id: '2',
      title: 'Parent-Teacher Meeting',
      content: 'PTM scheduled for Grade X students on 28th January 2024.',
      date: '2024-01-18',
      priority: 'medium',
      target: 'parents',
    },
    // Add more announcements as needed
  ];

  return (
    <View style={styles.container}>
      <HeaderBar title={t('announcements')} />
      
      <ScrollView style={styles.content}>
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>{t('active')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>{t('total')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>{t('scheduled')}</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.actionsCard}>
          <Button
            title={t('createAnnouncement')}
            variant="primary"
            style={styles.actionButton}
          />
          <View style={styles.searchContainer}>
            <Input
              placeholder={t('searchAnnouncements')}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
          </View>
        </Card>

        {announcements.map((announcement) => (
          <Card key={announcement.id} style={styles.announcementCard}>
            <View style={styles.announcementHeader}>
              <View>
                <Text style={styles.announcementTitle}>
                  {announcement.title}
                </Text>
                <Text style={styles.announcementDate}>
                  {announcement.date}
                </Text>
              </View>
              <View style={styles.badgeContainer}>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        announcement.priority === 'high'
                          ? Colors.error
                          : Colors.warning,
                    },
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {t(announcement.priority)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: Colors.secondary },
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {t(announcement.target)}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.announcementContent}>
              {announcement.content}
            </Text>

            <View style={styles.announcementActions}>
              <Button
                title={t('edit')}
                variant="secondary"
                style={styles.actionButton}
              />
              <Button
                title={t('delete')}
                variant="primary"
                style={styles.actionButton}
              />
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.sm,
  },
  statsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: Colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.buttonText,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.buttonText,
    opacity: 0.8,
  },
  actionsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  searchContainer: {
    marginTop: spacing.sm,
  },
  searchInput: {
    marginBottom: 0,
  },
  announcementCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  announcementDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.buttonText,
    fontWeight: '500',
  },
  announcementContent: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: spacing.md,
  },
  announcementActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  actionButton: {
    minWidth: 80,
  },
});

export default Announcements;