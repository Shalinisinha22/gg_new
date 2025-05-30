import React from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
import Theme from '../constants/Theme';
import { useLanguage } from '../hooks/useLanguage';

const { Colors, typography } = Theme;

export const HeaderTitle = ({ title, tintColor, style, ...rest }) => {
  const { t } = useLanguage();

  return (
    <Animated.Text
      role="heading"
      aria-level="1"
      numberOfLines={1}
      {...rest}
      style={[
        styles.title,
        {
          color: tintColor || Colors.headerText,
        },
        style
      ]}
    >
      {t(title)}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Platform.select({
      ios: {
        fontSize: 17,
        ...typography.fontWeights.bold,
      },
      android: {
        fontSize: 20,
        ...typography.fontWeights.medium,
      },
      default: {
        fontSize: 18,
        ...typography.fontWeights.bold,
      },
    }),
    textAlign: 'center',
  },
});

export default HeaderTitle;