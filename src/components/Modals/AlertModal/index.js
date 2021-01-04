import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Box from '../../Box';
import colors from '../../../constants/colors';
import Text, {TextWeight} from '../../Text';
import {useDispatch, useSelector} from 'react-redux';
import {getAlertModalInfo} from '../../../services/App/selectors';
import AppActions from '../../../services/App/actions';
import Button, {ButtonType} from '../../Button';
import {useTranslation} from 'react-i18next';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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

const AlertModal = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const {open, title, message, customButton} = useSelector(getAlertModalInfo);

  useEffect(() => {
    setIsVisible(open);
  }, [open]);

  const closeModal = () => {
    dispatch(AppActions.closeAlertModal());
  };

  return (
    <Modal
      useNativeDriver
      hideModalContentWhileAnimating
      isVisible={isVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      backdropColor="rgba(19, 25, 52, 0.7)"
      style={styles.modalContainer}>
      <Box width="80%" p={32} backgroundColor="white" borderRadius={8}>
        <Text size={20} weight={TextWeight.BOLD} align="center" mb={8}>
          {t(title)}
        </Text>
        <Text align="center" mb={24}>
          {t(message)}
        </Text>
        {customButton ? (
          customButton
        ) : (
          <Button type={ButtonType.OUTLINE} onPress={closeModal}>
            {t('close')}
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default AlertModal;
