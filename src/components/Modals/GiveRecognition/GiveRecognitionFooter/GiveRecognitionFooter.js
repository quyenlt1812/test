import React, {useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../../constants/colors';
import Box from '../../../Box';
import Text, {TextWeight} from '../../../Text';
import RecognitionActions from '../../../../services/Recognition/actions';
import styles from './styles';
import {getCurrentUser} from '../../../../services/Users/selectors';
import {TouchableWithoutFeedback} from 'react-native';
import {Keyboard} from 'react-native';

const GiveRecognitionFooter = ({
  nextStep,
  goToNextStep,
  activeStep,
  goToPreviousStep,
  selectedBadge,
  message,
  points,
  selectedImage,
  handleClose,
  selectedUser,
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [disableNext, setDisableNext] = useState(false);
  const _progress = useRef(new Animated.Value(0));

  const sendRecognition = () => {
    const data = {
      receiver_id: selectedUser?.id,
      message: message?.trim(),
      value: Math.round(points) * 5,
      badge_id: selectedBadge?.id,
      user_id: currentUser?.id,
    };
    if (selectedImage?.id) {
      data.image_id = selectedImage?.id;
    }
    handleClose();
    // AppSocket.sendRecognition(data);
    dispatch(RecognitionActions.sendRecognition(data));
  };

  useEffect(() => {
    switch (activeStep) {
      case 1: {
        setDisableNext(!selectedUser);
        break;
      }
      case 2: {
        setDisableNext(!selectedBadge);
        break;
      }
      case 3: {
        setDisableNext(!message);
        break;
      }
      case 4: {
        setDisableNext(
          Math.round(points) * 5 +
            Number.parseInt(currentUser?.recognition_send, 10) >
            Number.parseInt(currentUser?.recognition_budget, 10),
        );
        break;
      }
      case 5: {
        setDisableNext(!selectedImage);
        break;
      }
      default:
        setDisableNext(false);
    }
  }, [
    selectedUser,
    activeStep,
    selectedBadge,
    message,
    points,
    selectedImage,
    currentUser?.recognition_budget,
    currentUser?.recognition_send,
  ]);

  useEffect(() => {
    Animated.timing(_progress.current, {
      toValue: activeStep,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [activeStep]);

  const _progressWidth = _progress.current.interpolate({
    inputRange: [2, 5],
    outputRange: ['25%', '100%'],
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.safeView}>
        {activeStep < 6 && (
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: _progressWidth,
              },
            ]}
          />
        )}
        <Box px={15} height={70} flexDirection="row" alignItems="center">
          {activeStep > 1 && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={goToPreviousStep}
              style={styles.backButton}>
              <Text weight={TextWeight.BOLD}>{t('back')}</Text>
            </TouchableOpacity>
          )}

          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            style={styles.fullFlex}>
            {activeStep < 6 && (
              <Text size={14} color={colors.SECONDARY_TEXT} mr={15}>
                {t(nextStep)}
              </Text>
            )}
            <TouchableOpacity
              disabled={disableNext}
              activeOpacity={0.5}
              onPress={
                activeStep === 6
                  ? () => sendRecognition()
                  : () => goToNextStep()
              }
              style={[
                styles.nextStep,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  opacity: disableNext ? 0.5 : 1,
                },
              ]}>
              <Text weight={TextWeight.BOLD} color="white">
                {activeStep === 6 ? t('post') : t('next')}
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default GiveRecognitionFooter;
