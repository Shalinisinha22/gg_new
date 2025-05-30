import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, HeaderBar } from '../../components/StyledComponents';
import { Colors, spacing } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const Fees = () => {
  const { t } = useLanguage();

  const feesStats = [
    { label: t('totalCollected'), value: '₹12.5L', icon: '💰' },
    { label: t('pending'), value: '₹2.8L', icon: '⏳' },
    { label: t('dueToday'), value: '₹45K', icon: '📅' },
    { label: t('defaulters'), value: '23', icon: '⚠️' },
  ];

  const recentTransactions = [
    {
      id: '1',
      studentName: 'John Doe',
      amount: '₹25,000',
      date: '2024-01-20',
      status: 'paid',
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      amount: '₹30,000',
      date: '2024-01-19',
      status: 'pending',
    },
    // Add more transactions as needed
  ];

  return (
    <View style={styles.container}>
      <HeaderBar title={t('fees')} />
      
      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          {feesStats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        <Card style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
          <View style={styles.actionButtons}>
            <Button
              title={t('collectFees')}
              variant="primary"
              style={styles.actionButton}
            />
            <Button
              title={t('generateReport')}
              variant="secondary"
              style={styles.actionButton}
            />
            <Button
              title={t('sendReminders')}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>
        </Card>

        <Card style={styles.transactionsCard}>
          <Text style={styles.sectionTitle}>{t('recentTransactions')}</Text>
          
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.studentName}>{transaction.studentName}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              
              <View style={styles.transactionStatus}>
                <Text style={styles.amount}>{transaction.amount}</Text>
                <Text
                  style={[
                    styles.status,
                    {
                      color:
                        transaction.status === 'paid'
                          ? Colors.success
                          : Colors.error,
                    },
                  ]}
                >
                  {t(transaction.status)}
                </Text>
              </View>
            </View>
          ))}

          <Button
            title={t('viewAllTransactions')}
            variant="secondary"
            style={styles.viewAllButton}
          />
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>{t('feeSettings')}</Text>
          <Button
            title={t('manageFeeStructure')}
            variant="secondary"
            style={styles.settingButton}
          />
          <Button
            title={t('paymentMethods')}
            variant="secondary"
            style={styles.settingButton}
          />
        </Card>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statCard: {
    width: '48%',
    marginBottom: spacing.sm,
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.buttonText,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.buttonText,
    opacity: 0.8,
    textAlign: 'center',
  },
  actionsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.md,
  },
  actionButtons: {
    gap: spacing.sm,
  },
  actionButton: {
    marginBottom: spacing.xs,
  },
  transactionsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  transactionInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  transactionStatus: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewAllButton: {
    marginTop: spacing.md,
  },
  settingsCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  settingButton: {
    marginBottom: spacing.sm,
  },
});

export default Fees;