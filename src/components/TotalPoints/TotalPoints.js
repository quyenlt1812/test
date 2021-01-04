import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import colors from '../../constants/colors';
import Box from '../Box';
import Text, {TextWeight} from '../Text';
import {useNavigation} from '@react-navigation/native';
import Image from '../Image';
import {getCurrentUser} from '../../services/Users/selectors';
import NavigationService from '../../services/Navigation';

const styles = StyleSheet.create({
  myVouchersButton: {
    height: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
});

const TotalPoints = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const currentUser = useSelector(getCurrentUser);

  return (
    <Box
      px={18}
      height={80}
      borderRadius={16}
      backgroundColor={colors.BACKGROUND}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <Box flexDirection="row" alignItems="center">
        <Image
          src={require('../../assets/images/starts.png')}
          width={48}
          height={51}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Box ml={15}>
          <Text size={16} lineHeight={24}>
            {t('total-points')}
          </Text>
          <Text size={20} lineHeight={24} weight={TextWeight.EXTRABOLD}>
            {currentUser?.recognition_receive}
          </Text>
        </Box>
      </Box>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate(NavigationService.Screens.MY_VOUCHERS)
        }>
        <LinearGradient
          colors={['rgb(185,232,211)', 'rgb(177,232,229)']}
          style={styles.myVouchersButton}>
          <Text
            size={14}
            lineHeight={24}
            weight={TextWeight.EXTRABOLD}
            color={colors.GREEN}>
            {t('my-vouchers')}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Box>
  );
};

export default TotalPoints;
