import React from 'react';
import {Keyboard, TextInput, TouchableWithoutFeedback} from 'react-native';
import {useTranslation} from 'react-i18next';
import Box from '../../../../Box';
import colors from '../../../../../constants/colors';
import Tag from '../../../../Tag';
import styles from './styles';
import GiveRecognitionUser from '../../../../GiveRecognitionUser';
import Text from '../../../../Text';

const LeaveAMessage = ({
  selectedUser,
  selectedBadge,
  removeSelectedUser,
  message,
  setMessage,
}) => {
  const {t} = useTranslation();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Box style={styles.fullSize}>
        <GiveRecognitionUser
          user={selectedUser}
          removeSelectedUser={removeSelectedUser}
        />
        <Box
          mt={12}
          mx={15}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Tag text={selectedBadge?.title} />
          <Text
            size={12}
            color={
              message?.length === 255 ? colors.RED : colors.SECONDARY_TEXT
            }>
            {!message || message?.length === 0
              ? t('max-characters')
              : `${message?.length}/255`}
          </Text>
        </Box>

        <Box style={styles.fullSize}>
          <TextInput
            multiline
            textAlignVertical="top"
            selectionColor={colors.PRIMARY}
            placeholder={t('write-your-recognition')}
            style={styles.input}
            value={message}
            onChangeText={(value) => setMessage(value)}
            placeholderTextColor={colors.SECONDARY_TEXT}
            maxFontSizeMultiplier={1}
            maxLength={255}
          />
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default LeaveAMessage;
