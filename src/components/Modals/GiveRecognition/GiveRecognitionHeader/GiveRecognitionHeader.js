import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import colors from '../../../../constants/colors';
import Box from '../../../Box';
import Text, {TextWeight} from '../../../Text';

const styles = StyleSheet.create({
  cancelButton: {position: 'absolute', left: 15},
  skipButton: {position: 'absolute', right: 15},
});

const GiveRecognitionHeader = ({
  title,
  handleClose,
  skipable,
  onSkipPress,
  goToNexStep,
}) => {
  const {t} = useTranslation();
  return (
    <Box width="100%" alignItems="center" justifyContent="center" py={10}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleClose}
        style={styles.cancelButton}>
        <Text size={18} weight={TextWeight.BOLD} color={colors.PRIMARY}>
          {t('cancel')}
        </Text>
      </TouchableOpacity>
      <Text size={18} weight={TextWeight.BOLD}>
        {t(title)}
      </Text>
      {skipable && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onSkipPress ? () => onSkipPress() : () => goToNexStep()}
          style={styles.skipButton}>
          <Text size={18} weight={TextWeight.BOLD} color={colors.PRIMARY}>
            {t('skip')}
          </Text>
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default GiveRecognitionHeader;
