import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native';
import Box from '../../../components/Box';
import Text, {TextWeight} from '../../../components/Text';
import VoucherItem from '../../../components/VoucherItem';
import colors from '../../../constants/colors';
import styles from '../styles';
import {Dimensions} from 'react-native';
import VouchersBg from '../../../assets/images/voucher-bg-noline.png';
import Image from '../../../components/Image';
import NavigationService from '../../../services/Navigation';
import Button from '../../../components/Button';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentUser,
  getUserRewards,
} from '../../../services/Users/selectors';
import uuid from 'react-native-uuid';
import UsersAction from '../../../services/Users/actions';

const ActiveVouchers = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUser = useSelector(getCurrentUser);
  const rewards = useSelector(getUserRewards);

  useEffect(() => {
    if (!rewards.list) {
      dispatch(UsersAction.getUserRewards({userId: currentUser.id, offset: 0}));
    }
  }, [rewards.list, dispatch, currentUser.id]);

  const handleRefresh = () => {
    dispatch(UsersAction.getUserRewards({userId: currentUser.id, offset: 0}));
  };

  const goToScreen = (screen) => {
    navigation.popToTop();
    navigation.navigate(screen);
  };

  if (!rewards?.list?.length) {
    return (
      <Box px={32} style={styles.fullFlex}>
        <Box
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
                {t('no-active-voucher')}
              </Text>
            </Box>
          </Box>
          <Text color={colors.SECONDARY_TEXT} align="center">
            {t('no-active-voucher-message')}
          </Text>
        </Box>
        <Box mb={24}>
          <Button onPress={() => goToScreen(NavigationService.Screens.REWARDS)}>
            {t('browse-rewards')}
          </Button>
        </Box>
      </Box>
    );
  }

  const renderItem = ({item}) => <VoucherItem data={item} />;

  return (
    <FlatList
      onRefresh={handleRefresh}
      refreshing={rewards.isLoading}
      keyExtractor={({id}) => `voucher-${id}`}
      initialNumToRender={10}
      contentContainerStyle={styles.activeVouchers}
      ListHeaderComponent={() => (
        <Box>
          <Box mb={24}>
            <Text size={20} weight={TextWeight.SEMIBOLD} mb={16}>
              {t('recently-added')}
            </Text>
            <VoucherItem data={rewards?.list[0]} />
          </Box>
          <Text size={20} weight={TextWeight.SEMIBOLD} mb={16}>
            {t('all-vouchers')}
          </Text>
        </Box>
      )}
      data={rewards.list.slice(1)}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Box height={16} />}
    />
  );
};

export default ActiveVouchers;
