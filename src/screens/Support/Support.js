import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Box from '../../components/Box';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import Text, {TextWeight} from '../../components/Text';
import colors from '../../constants/colors';
import NavigationService from '../../services/Navigation';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  contactUs: {
    borderColor: colors.GAINSBORO,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  terms: {
    borderColor: colors.GAINSBORO,
    borderBottomWidth: 1,
  },
});

const Support = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Header backable title={t('support')} />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate(NavigationService.Screens.CONTACT_US)
        }
        style={styles.contactUs}>
        <Box
          px={15}
          height={60}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text size={18} weight={TextWeight.BOLD}>
            {t('contact-us')}
          </Text>
          <Icon name="chevron-right" size={16} color={colors.SECONDARY_TEXT} />
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate(NavigationService.Screens.TERMS_AND_POLICIES)
        }
        style={styles.terms}>
        <Box
          px={15}
          height={60}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text size={18} weight={TextWeight.BOLD}>
            {t('terms')}
          </Text>
          <Icon name="chevron-right" size={16} color={colors.SECONDARY_TEXT} />
        </Box>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Support;
