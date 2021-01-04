/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import Text, {TextWeight} from '../Text';
import styles from './styles';

export const ButtonType = {
  NORMAL: 'normal',
  OUTLINE: 'outline',
  DANGER: 'danger',
};

const styleMapping = {
  normal: {
    container: styles.normalButton,
    text: {weight: TextWeight.EXTRABOLD, color: colors.WHITE},
  },
  outline: {
    container: styles.outlineButton,
    text: {weight: TextWeight.EXTRABOLD, color: colors.PRIMARY},
  },
  danger: {
    container: styles.dangerButton,
    text: {weight: TextWeight.EXTRABOLD, color: colors.WHITE},
  },
};

const Button = ({
  children,
  type,
  disabled,
  onPress,
  style,
  flex,
  noPadding,
  height,
  fontSize,
  loading,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      activeOpacity={0.5}
      style={[
        styleMapping[type].container,
        style,
        {opacity: disabled || loading ? 0.5 : 1},
        flex ? {flex: flex} : {},
        noPadding ? {paddingHorizontal: 0} : {},
        height ? {height} : {},
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={colors.WHITE} />
      ) : (
        <Text {...styleMapping[type].text} size={fontSize}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  type: ButtonType.NORMAL,
  disabled: false,
  height: 45,
  fontSize: 16,
};

export default Button;
