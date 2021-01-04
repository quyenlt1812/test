import React from 'react';
import {Dimensions} from 'react-native';
import {FlatList} from 'react-native';
import Box from '../../../components/Box';
import Image from '../../../components/Image';
import Text, {TextWeight} from '../../../components/Text';
import VoucherItem from '../../../components/VoucherItem';
import styles from '../styles';
import VouchersBg from '../../../assets/images/voucher-bg-noline.png';
import {useTranslation} from 'react-i18next';

const ExpiredVouchers = () => {
  const {t} = useTranslation();
  const vouchers = [];

  if (!vouchers.length) {
    return (
      <Box
        px={32}
        alignItems="center"
        justifyContent="center"
        style={styles.fullFlex}>
        <Box
          width={Dimensions.get('window').width - 64}
          height={(Dimensions.get('window').width - 64) / 2.65}
          mb={18}
          flexDirection="row"
          alignItems="center">
          <Image
            src={VouchersBg}
            width={Dimensions.get('window').width - 64}
            height={(Dimensions.get('window').width - 64) / 2.65}
            style={styles.voucherBackground}
          />
          <Box
            width="100%"
            style={[styles.fullFlex, {position: 'absolute'}]}
            pb={15}
            alignItems="center">
            <Text weight={TextWeight.SEMIBOLD} size={18}>
              {t('no-expired-voucher')}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }

  const renderItem = ({item}) => <VoucherItem expired data={item} />;

  return (
    <FlatList
      initialNumToRender={10}
      contentContainerStyle={styles.expiredVoucher}
      data={vouchers}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Box height={16} />}
    />
  );
};

export default ExpiredVouchers;
