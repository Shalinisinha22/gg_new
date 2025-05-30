import React from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
import Theme from '../constants/Theme';

const { Colors, typography } = Theme;

const CustomHeaderTitle = ({ children, tintColor, style }) => {
  return (
    <Animated.Text
      role="heading"
      aria-level="1"
      numberOfLines={1}
      style={[
        styles.title,
        {
          color: tintColor || Colors.headerText,
        },
        style
      ]}
    >
      {children}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Platform.select({
      ios: {
        fontSize: 17,
        fontWeight: '600',
      },
      android: {
        fontSize: 20,
        fontWeight: '500',
      },
      default: {
        fontSize: 18,
        fontWeight: '600',
      }
    }),
    textAlign: 'center',
  },
});

export default CustomHeaderTitle;