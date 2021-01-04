import React, {forwardRef, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import Box from '../Box';
import Icon from '../Icon';
import Text from '../Text';
import styles from './styles';

const Input = forwardRef(
  ({icon, secureTextEntry, style, error, ...rest}, ref) => {
    const [showSecureText, setShowSecureText] = useState(false);

    return (
      <Box mb={40}>
        <Box
          height={56}
          flexDirection="row"
          alignItems="center"
          style={styles.inputContainer}>
          <Box width={30} alignItems="center">
            <Icon name={icon} size={16} />
          </Box>
          <TextInput
            ref={ref}
            secureTextEntry={secureTextEntry && !showSecureText}
            selectionColor={colors.PRIMARY}
            style={[styles.input, style]}
            placeholderTextColor={colors.PRIMARY_TEXT}
            maxFontSizeMultiplier={1}
            {...rest}
          />
          {secureTextEntry && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.showPasswordButton}
              onPress={() => setShowSecureText(!showSecureText)}>
              <Icon
                name={showSecureText ? 'eye' : 'eye-blind'}
                size={18}
                color={showSecureText ? colors.PRIMARY : colors.SECONDARY_TEXT}
              />
            </TouchableOpacity>
          )}
        </Box>
        {!!error && (
          <Text size={14} mt={4} color={colors.RED} style={styles.inputError}>
            {error}
          </Text>
        )}
      </Box>
    );
  },
);

export default Input;
