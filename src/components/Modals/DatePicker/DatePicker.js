import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Box from '../../Box';
import colors from '../../../constants/colors';
import DatePicker from 'react-native-date-picker';
import Text, {TextWeight} from '../../Text';

const styles = StyleSheet.create({
  modalContainer: {alignItems: 'center', justifyContent: 'center'},
  confirmButton: {
    flex: 1,
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
  },
  cancelButton: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

const DateChooser = ({initialDate, isVisible, handleClose, confirmDate}) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    if (initialDate) {
      setDate(new Date(initialDate));
    } else {
      setDate(new Date());
    }
  }, [initialDate]);

  const submitDate = () => {
    confirmDate(date);
    handleClose();
  };

  return (
    <Modal
      useNativeDriver
      hideModalContentWhileAnimating
      isVisible={isVisible}
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
      backdropColor="rgba(19, 25, 52, 0.7)"
      style={styles.modalContainer}>
      <Box py={32} backgroundColor="white" borderRadius={8}>
        <DatePicker
          date={date}
          mode="date"
          onDateChange={(value) => setDate(value)}
        />
        <Box flexDirection="row" alignItems="center" mx={15} mt={20}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.confirmButton}
            onPress={submitDate}>
            <Text weight={TextWeight.EXTRABOLD} color="white">
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.cancelButton}
            onPress={handleClose}>
            <Text weight={TextWeight.EXTRABOLD} color={colors.SECONDARY_TEXT}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Modal>
  );
};

DateChooser.defaultProps = {
  initialDate: '',
};

export default DateChooser;
