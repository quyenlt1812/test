import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {getConfimModalInfo} from '../../../services/App/selectors';
import AppActions from '../../../services/App/actions';
import Text, {TextWeight} from '../../Text';
import Box from '../../Box';
import colors from '../../../constants/colors';
import Button, {ButtonType} from '../../Button';
import {useTranslation} from 'react-i18next';

const styles = StyleSheet.create({
  modalContainer: {alignItems: 'center', justifyContent: 'center'},
  closeButton: {
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    flex: 1,
  },
});

const Confirmation = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {
    open,
    title,
    message,
    onConfirm,
    onCancel,
    confirmTitle,
    cancelTitle,
    isDanger,
    isRequired = false,
  } = useSelector(getConfimModalInfo);

  const closeModal = () => {
    dispatch(AppActions.closeConfirmModal());
  };
  return (
    <Modal
      useNativeDriver
      hideModalContentWhileAnimating
      isVisible={open}
      onBackButtonPress={isRequired ? null : () => closeModal()}
      onBackdropPress={isRequired ? null : () => closeModal()}
      backdropColor="rgba(19, 25, 52, 0.7)"
      style={styles.modalContainer}>
      <Box width="80%" p={32} backgroundColor="white" borderRadius={8}>
        <Text size={20} weight={TextWeight.BOLD} align="center" mb={8}>
          {title}
        </Text>
        <Text align="center" mb={24}>
          {message}
        </Text>
        <Box flexDirection="row" alignItems="center">
          <Button
            noPadding
            flex={1}
            type={isDanger ? ButtonType.DANGER : ButtonType.NORMAL}
            onPress={onConfirm}>
            {confirmTitle}
          </Button>
          {!isRequired && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.closeButton}
              onPress={onCancel || closeModal}>
              <Text
                weight={TextWeight.EXTRABOLD}
                color={isDanger ? colors.SECONDARY_TEXT : colors.PRIMARY}>
                {cancelTitle || t('cancel')}
              </Text>
            </TouchableOpacity>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default Confirmation;
