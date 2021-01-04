import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/colors';
import AppActions from '../../../services/App/actions';
import RewardRepo from '../../../services/Reward/repo';
import UsersAction from '../../../services/Users/actions';
import {getCurrentUser} from '../../../services/Users/selectors';
import Box from '../../Box';
import Icon from '../../Icon';
import Image from '../../Image';
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

const ClaimReward = ({isVisible, handleClose, reward}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [isVisible]);

  const handleClaimReward = async () => {
    try {
      setLoading(true);
      const result = await RewardRepo.claimRewardRepo({rewardId: reward.id});
      if (result?.data?.reward) {
        handleClose();
        const currentBudget = currentUser.recognition_receive - reward?.value;
        dispatch(
          UsersAction.setCurrentUser({recognition_receive: currentBudget}),
        );
        dispatch(
          UsersAction.getUserRewards({userId: currentUser.id, offset: 0}),
        );
        setLoading(false);
        navigation.replace('ClaimRewardSuccess', {reward});
      } else {
        handleClose();
        setTimeout(() => {
          dispatch(
            AppActions.openAlertModal({
              title: 'Failed',
              message: 'Try again later',
            }),
          );
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      console.error('handleClaimReward -> error', error);
      // handleClose();
      // dispatch(
      //   AppActions.openAlertModal({
      //     title: 'Failed',
      //     message: 'Try again later',
      //   }),
      // );
    }
  };

  return (
    <Modal
      useNativeDriver
      hideModalContentWhileAnimating
      isVisible={isVisible}
      onBackButtonPress={loading ? null : () => handleClose()}
      onBackdropPress={loading ? null : () => handleClose()}
      backdropColor="rgba(19, 25, 52, 0.7)"
      style={styles.modalContainer}>
      <Box
        width={280}
        p={24}
        backgroundColor="white"
        borderRadius={8}
        alignItems="center">
        <Box
          mb={14}
          width={48}
          height={48}
          borderRadius={24}
          backgroundColor={colors.LIGHTCYAN}
          alignItems="center"
          justifyContent="center">
          <Box
            width={38}
            height={38}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
            backgroundColor={colors.ACCENT}>
            <Icon name="bell" size={18} color={colors.LIGHTCYAN} />
          </Box>
        </Box>
        <Text align="center" mb={16} lineHeight={22}>
          {t('claim-reward-message')}
        </Text>
        <Box
          width="100%"
          px={10}
          mb={24}
          height={86}
          backgroundColor={colors.BACKGROUND}
          borderRadius={8}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text size={20} weight={TextWeight.SEMIBOLD}>
            {`${reward?.value || 0} ${t('pts').toLowerCase()}`}
          </Text>
          <Icon name="arrow-right" size={30} color={colors.GAINSBORO} />
          <Box>
            <Image
              src={reward?.vendor?.image}
              width={64}
              height={64}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Box>
        </Box>
        <Box flexDirection="row">
          <TouchableOpacity
            disabled={loading}
            activeOpacity={0.5}
            onPress={handleClaimReward}
            style={[
              styles.confirmButton,
              loading ? {opacity: 0.5} : {opacity: 1},
            ]}>
            {loading ? (
              <ActivityIndicator color={colors.WHITE} />
            ) : (
              <Text weight={TextWeight.EXTRABOLD} color="white">
                {t('confirm')}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loading}
            activeOpacity={0.5}
            onPress={handleClose}
            style={[
              styles.cancelButton,
              loading ? {opacity: 0.5} : {opacity: 1},
            ]}>
            <Text weight={TextWeight.EXTRABOLD} color={colors.PRIMARY}>
              {t('cancel')}
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Modal>
  );
};

export default ClaimReward;
