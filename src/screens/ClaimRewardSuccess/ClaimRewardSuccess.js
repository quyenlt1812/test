import React from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import Box from '../../components/Box';
import Text, {TextWeight} from '../../components/Text';
import colors from '../../constants/colors';
import VouchersBg from '../../assets/images/vouchers-bg.png';
import Image from '../../components/Image';
import Icon from '../../components/Icon';
import TestLogo from '../../assets/images/test-logo.png';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Button, {ButtonType} from '../../components/Button';
import NavigationService from '../../services/Navigation';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '../../services/Users/selectors';

const ClaimRewardSuccess = ({navigation, route}) => {
  const {reward} = route.params;
  const currentUser = useSelector(getCurrentUser);

  return (
    <SafeAreaView style={styles.container}>
      <Box
        mx={32}
        alignItems="center"
        justifyContent="center"
        style={styles.fullFlex}>
        <Text size={20} lineHeight={24} weight={TextWeight.EXTRABOLD} mb={32}>
          New voucher added
        </Text>
        <Box
          width={Dimensions.get('window').width - 64}
          height={(Dimensions.get('window').width - 64) / 2.65}
          mb={18}
          flexDirection="row"
          alignItems="center">
          <Box
            width={30}
            height={30}
            borderRadius={15}
            alignItems="center"
            justifyContent="center"
            backgroundColor={colors.ACCENT}
            style={styles.checkContainer}>
            <Icon name="check" color={colors.WHITE} />
          </Box>
          <Image
            src={VouchersBg}
            width={Dimensions.get('window').width - 64}
            height={(Dimensions.get('window').width - 64) / 2.65}
            style={styles.voucherBackground}
          />
          <Box width="28%" alignItems="center">
            <Image
              src={reward?.vendor?.image}
              width="60%"
              height={(Dimensions.get('window').width - 30) / 2.65 - 20}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Box>
          <Box style={styles.fullFlex} p={20} alignItems="flex-start">
            <Text mb={5}>{reward?.title}</Text>
          </Box>
        </Box>
        <Box
          width="100%"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text>Current point balance:</Text>
          <Text>{currentUser.recognition_receive} pts</Text>
        </Box>
      </Box>
      <Box mx={32}>
        <Box mb={24}>
          <Button onPress={() => navigation.pop()}>Continue browsing</Button>
        </Box>
        <Box mb={24}>
          <Button
            type={ButtonType.OUTLINE}
            onPress={() =>
              navigation.replace(NavigationService.Screens.MY_VOUCHERS)
            }>
            View my vouchers
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default ClaimRewardSuccess;
