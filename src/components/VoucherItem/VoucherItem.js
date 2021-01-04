import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../constants/colors';
import Box from '../Box';
import Text from '../Text';
import Image from '../Image';
import VoucherBg from '../../assets/images/voucher-bg.png';
import TestLogo from '../../assets/images/test-logo.png';
import NavigationService from '../../services/Navigation';

const WIDTH = Dimensions.get('window').width;

const VoucherItem = ({data, expired}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      disabled={expired}
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate(NavigationService.Screens.VOUCHER_DETAIL, {data})
      }>
      <Box
        width={WIDTH - 30}
        height={(WIDTH - 30) / 3.01}
        flexDirection="row"
        alignItems="center">
        <Image
          src={VoucherBg}
          width={WIDTH - 30}
          height={(WIDTH - 30) / 3.01}
          borderRadius={8}
          style={{position: 'absolute'}}
        />
        <Box width="28%" alignItems="center">
          <Image
            src={data?.vendor_image || TestLogo}
            width="60%"
            height={(WIDTH - 30) / 3.01 - 20}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Box>
        <Box style={{flex: 1}} p={20} alignItems="flex-start">
          <Text mb={5} numberOfLines={2}>
            {data?.title?.split('_')[0]}
          </Text>
          {/* <Text size={12} color={colors.SECONDARY_TEXT}>
            {`${expired ? 'Expired on' : 'Valid until'} 24/10/2020`}
          </Text> */}
          {/* {!expired && (
            <Box
              mt={6}
              px={10}
              height={20}
              backgroundColor={colors.ORANGE}
              justifyContent="center"
              borderRadius={8}>
              <Text size={12} color={colors.WHITE}>
                6 days
              </Text>
            </Box>
          )} */}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default VoucherItem;
