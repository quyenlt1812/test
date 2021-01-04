import React from 'react';
import {Linking, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import Box from '../../Box';
import colors from '../../../constants/colors';
import Text, {TextWeight} from '../../Text';
import Button, {ButtonType} from '../../Button';

const styles = StyleSheet.create({
  modalContainer: {alignItems: 'center', justifyContent: 'center'},
  closeButton: {
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    borderColor: colors.PRIMARY,
    borderWidth: 1,
  },
});

const PermissionRequestModal = ({
  open,
  title,
  message,
  customButton,
  handleClose,
}) => {
  const {t} = useTranslation();

  const closeModal = () => {
    handleClose();
  };

  const openSettings = () => {
    Linking.openSettings();
    handleClose();
  };

  return (
    <Modal
      useNativeDriver
      hideModalContentWhileAnimating
      isVisible={open}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      backdropColor="rgba(19, 25, 52, 0.7)"
      style={styles.modalContainer}>
      <Box width="80%" p={32} backgroundColor="white" borderRadius={8}>
        <Text size={20} weight={TextWeight.BOLD} align="center" mb={8}>
          {title}
        </Text>
        <Text align="center" mb={24}>
          {message}
        </Text>
        {customButton ? (
          customButton
        ) : (
          <Button type={ButtonType.OUTLINE} onPress={openSettings}>
            {t('open-settings')}
          </Button>
        )}
      </Box>
    </Modal>
  );
};

PermissionRequestModal.defaultProps = {
  title: 'Permission Required',
  message: 'Some permission need your approve',
};

export default PermissionRequestModal;
