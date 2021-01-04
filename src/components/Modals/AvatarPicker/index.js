import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import Box from '../../Box';
import colors from '../../../constants/colors';
import Text, {TextWeight} from '../../Text';
import Icon from '../../Icon';
import PermissionRequestModal from '../PermissionRequestModal';

const styles = StyleSheet.create({
  modalContainer: {alignItems: 'center', justifyContent: 'flex-end'},
  closeButton: {
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    borderColor: colors.PRIMARY,
    borderWidth: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

const AvatarPicker = ({open, handleClose, changeAvatar}) => {
  const {t} = useTranslation();
  const [request, setRequest] = useState({});

  const closeModal = () => {
    handleClose();
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
      smartAlbums: [
        'Generic',
        'Panoramas',
        'Favorites',
        'RecentlyAdded',
        'Bursts',
        'UserLibrary',
        'SelfPortraits',
        'LivePhotos',
        'Animated',
        'LongExposure',
      ],
    })
      .then((images) => {
        const file = {
          uri: images.path,
          type: images.mime,
          name: images.path.substring(images.path.lastIndexOf('/') + 1),
        };
        changeAvatar(file);
        closeModal();
      })
      .catch((error) => {
        if (error.code === 'E_PICKER_CANCELLED') {
          closeModal();
          return;
        }
        setRequest({
          open: true,
          title: t('permission-required'),
          message: t(`permissions.${error.code}`),
        });
        // closeModal();
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      useFrontCamera: true,
    })
      .then((images) => {
        const file = {
          uri: images.path,
          type: images.mime,
          name: images.path.substring(images.path.lastIndexOf('/') + 1),
        };
        changeAvatar(file);
        closeModal();
      })
      .catch((error) => {
        if (error.code === 'E_PICKER_CANCELLED') {
          closeModal();
          return;
        }
        setRequest({
          open: true,
          title: t('permission-required'),
          message: t(`permissions.${error.code}`),
        });
      });
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
      <SafeAreaView style={{width: '100%', justifyContent: 'flex-end'}}>
        <Box width="100%">
          <Box
            width="100%"
            backgroundColor="white"
            mb={10}
            px={32}
            py={24}
            borderRadius={8}>
            <Text weight={TextWeight.BOLD} size={18} mb={10}>
              {t('select-avatar')}
            </Text>
            <Box width="100%" flexDirection="row">
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.button}
                onPress={openGallery}>
                <Icon name="images" size={40} color={colors.PRIMARY_TEXT} />
                <Text mt={10} weight={TextWeight.SEMIBOLD}>
                  {t('from-gallery')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.button}
                onPress={openCamera}>
                <Icon name="camera" size={40} color={colors.PRIMARY_TEXT} />
                <Text mt={10} weight={TextWeight.SEMIBOLD}>
                  {t('take-a-picture')}
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
          <TouchableOpacity activeOpacity={0.5} onPress={closeModal}>
            <Box
              height={45}
              backgroundColor="white"
              borderRadius={8}
              alignItems="center"
              justifyContent="center">
              <Text weight={TextWeight.BOLD} color={colors.PRIMARY}>
                {t('cancel')}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </SafeAreaView>
      <PermissionRequestModal
        {...request}
        handleClose={() => setRequest({...request, open: false})}
      />
    </Modal>
  );
};

export default AvatarPicker;
