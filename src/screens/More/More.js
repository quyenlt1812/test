import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import VersionNumber from 'react-native-version-number';
import Color from 'color';
import {getCurrentUser} from 'services/Users/selectors';
import AuthActions from 'services/Auth/actions';
import AppActions from 'services/App/actions';
import NavigationService from 'services/Navigation';
import colors from 'constants/colors';
import Box from 'components/Box';
import Avatar from 'components/Avatar';
import Text from 'components/Text';
import Icon from 'components/Icon';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.WHITESMOKE},
  accInfoSafeArea: {
    backgroundColor: 'white',
    marginBottom: 18,
    shadowColor: Color.rgb(colors.BLACK).alpha(0.05).toString(),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 3,
  },
});

const Divider = () => (
  <Box
    width={Dimensions.get('window').width - 66}
    height={1}
    backgroundColor={colors.WHITESMOKE}
    style={{right: 0}}
  />
);

const More = ({navigation}) => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const currentUser = useSelector(getCurrentUser);

  const handleSignOut = () => {
    dispatch(AuthActions.signOut());
  };

  return (
    <Box style={styles.container}>
      <SafeAreaView style={styles.accInfoSafeArea}>
        <Box backgroundColor="white" pt={23} pb={17} alignItems="center">
          <Avatar src={currentUser?.avatar} alt={currentUser?.name} size={80} />
          <Text size={20} mt={13} align="center" mx={20}>
            {currentUser?.name}
          </Text>
          {!!currentUser?.role && (
            <Text color={colors.SECONDARY_TEXT}>
              {currentUser?.role?.title}
            </Text>
          )}
        </Box>
      </SafeAreaView>
      <Box width="100%" mb={18} backgroundColor="white" alignItems="flex-end">
        <TouchableOpacity
          style={{width: '100%'}}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate(NavigationService.Screens.MY_ACCOUNT)
          }>
          <Box
            width="100%"
            backgroundColor="white"
            height={54}
            px={15}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Box flexDirection="row" alignItems="center">
              <Box
                width={36}
                height={36}
                borderRadius={18}
                backgroundColor={colors.SECONDARY_TEXT}
                alignItems="center"
                justifyContent="center"
                mr={15}>
                <Icon name="user" color="white" size={18} />
              </Box>
              <Text>{t('my-account')}</Text>
            </Box>
            <Icon
              name="chevron-right"
              size={16}
              color={colors.SECONDARY_TEXT}
            />
          </Box>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={{width: '100%'}}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate(NavigationService.Screens.MY_VOUCHERS)
          }>
          <Box
            backgroundColor="white"
            height={54}
            px={15}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Box flexDirection="row" alignItems="center">
              <Box
                width={36}
                height={36}
                borderRadius={18}
                backgroundColor="#0dc758"
                alignItems="center"
                justifyContent="center"
                mr={15}>
                <Icon name="voucher" color="white" size={18} />
              </Box>
              <Text>{t('my-vouchers')}</Text>
            </Box>
            <Icon
              name="chevron-right"
              size={16}
              color={colors.SECONDARY_TEXT}
            />
          </Box>
        </TouchableOpacity>
      </Box>
      <Box width="100%" backgroundColor="white" alignItems="flex-end">
        <TouchableOpacity
          style={{width: '100%'}}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate(NavigationService.Screens.LANGUAGE)
          }>
          <Box
            backgroundColor="white"
            height={54}
            px={15}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Box flexDirection="row" alignItems="center">
              <Box
                width={36}
                height={36}
                borderRadius={18}
                backgroundColor={colors.BLUE}
                alignItems="center"
                justifyContent="center"
                mr={15}>
                <Icon name="globe" color="white" size={18} />
              </Box>
              <Text>{t('language')}</Text>
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Text color={colors.SECONDARY_TEXT} mr={16}>
                {t(i18n.language)}
              </Text>
              <Icon
                name="chevron-right"
                size={16}
                color={colors.SECONDARY_TEXT}
              />
            </Box>
          </Box>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={{width: '100%'}}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate(NavigationService.Screens.SUPPORT)
          }>
          <Box
            backgroundColor="white"
            height={54}
            px={15}
            flexDirection="row"
            alignItems="center">
            <Box
              width={36}
              height={36}
              borderRadius={18}
              backgroundColor={colors.YELLOW}
              alignItems="center"
              justifyContent="center"
              mr={15}>
              <Icon name="question" color="white" size={18} />
            </Box>
            <Text>{t('support')}</Text>
          </Box>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={{width: '100%'}}
          activeOpacity={0.5}
          onPress={() => {
            dispatch(
              AppActions.openConfirmModal({
                title: `${t('sign-out')}?`,
                message: t('sign-out-message'),
                confirmTitle: t('sign-out'),
                cancelTitle: t('cancel'),
                onConfirm: handleSignOut,
                isDanger: true,
              }),
            );
          }}>
          <Box
            backgroundColor="white"
            height={54}
            px={15}
            flexDirection="row"
            alignItems="center">
            <Box
              width={36}
              height={36}
              borderRadius={18}
              backgroundColor={colors.REDORANGE}
              alignItems="center"
              justifyContent="center"
              mr={15}>
              <Icon name="log-out" color="white" size={18} />
            </Box>
            <Text color={colors.REDORANGE}>{t('sign-out')}</Text>
          </Box>
        </TouchableOpacity>
      </Box>
      <Box mt={20} justifyContent="center" alignItems="center">
        <Text size={12} color={colors.SECONDARY_TEXT}>{`${t(
          'current-version',
        )}: ${VersionNumber.appVersion}`}</Text>
        <Text size={12} color={colors.SECONDARY_TEXT}>{`${t(
          'last-updated-on',
        )} ${new Date(
          VersionNumber.buildVersion * 1000,
        ).toLocaleDateString()} ${new Date(
          VersionNumber.buildVersion * 1000,
        ).toLocaleTimeString()}`}</Text>
      </Box>
    </Box>
  );
};

export default More;
