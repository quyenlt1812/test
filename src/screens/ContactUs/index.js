import React from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Box from '../../components/Box';
import Header from '../../components/Header';
import Text, {TextWeight} from '../../components/Text';
import colors from '../../constants/colors';
import Facebook from '../../assets/images/facebook.svg';
import Linkein from '../../assets/images/linkein.svg';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.WHITE},
  facebook: {marginRight: 15},
});

const ContactUs = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Header backable title="Contact Us" />
      <Box p={15}>
        <Text mb={24}>{t('report-problem')}</Text>
        <Box flexDirection="row" alignItems="center">
          <Text>{t('contact-phone')}: </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => Linking.openURL('tel:0867681837')}>
            <Text color={colors.BLUE}>08 676 818 37</Text>
          </TouchableOpacity>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <Text>Email: </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => Linking.openURL('mailto:info@tribee.vn')}>
            <Text color={colors.BLUE}>info@tribee.vn</Text>
          </TouchableOpacity>
        </Box>
        <Text size={18} weight={TextWeight.BOLD} mt={17} mb={24}>
          {t('follow-us')}
        </Text>
        <Box flexDirection="row" alignItems="center">
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => Linking.openURL('https://m.me/tribee.vn')}
            style={styles.facebook}>
            <Facebook />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              Linking.openURL('https://www.linkedin.com/company/tribee-vn')
            }>
            <Linkein />
          </TouchableOpacity>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default ContactUs;
