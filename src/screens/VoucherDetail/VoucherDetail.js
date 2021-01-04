import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Box from '../../components/Box';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import Text, {TextWeight} from '../../components/Text';
import colors from '../../constants/colors';
import {HtmlParseAndView} from '@react-native-html/renderer';
import QRCode from 'react-native-qrcode-svg';
import Barcode from 'react-native-barcode-builder';
import {useTranslation} from 'react-i18next';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});

const htmlStyles = {
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.PRIMARY,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.PRIMARY_TEXT,
    fontFamily: 'Nunito-Regular',
  },
};

const VoucherDetail = ({route}) => {
  const {t} = useTranslation();
  const {data} = route?.params;
  const [openDes, setOpenDes] = useState(true);
  const [openAccept, setOpenAccept] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header backable title={data?.vendor_title || ''} />
      <ScrollView style={{flex: 1}}>
        <Box p={15}>
          <Text size={18} mb={16}>
            {data?.title?.split('_')[0]}
          </Text>
          <Box
            backgroundColor={colors.BACKGROUND}
            p={24}
            borderRadius={16}
            alignItems="center">
            <Box
              width="100%"
              mb={10}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text size={18}>Online code</Text>
              <Text size={18} weight={TextWeight.EXTRABOLD}>
                {data.code}
              </Text>
            </Box>
            <Box width="100%" mb={16}>
              <Barcode
                background="transparent"
                value={data?.code}
                format="CODE128"
              />
            </Box>
            <QRCode
              value={data?.code}
              size={180}
              backgroundColor="transparent"
            />
            {/* <Box
              width="100%"
              mt={16}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text size={18}>Valid until</Text>
              <Text size={18} weight={TextWeight.EXTRABOLD}>
                24 October 2020
              </Text>
            </Box> */}
          </Box>
        </Box>
        <Box
          mt={15}
          style={{
            borderColor: colors.GAINSBORO,
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setOpenDes(!openDes)}>
            <Box
              px={15}
              height={60}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text size={18} weight={TextWeight.BOLD}>
                {t('description')}
              </Text>
              <Icon
                name="chevron-down"
                size={15}
                color={colors.SECONDARY_TEXT}
                style={{transform: [{rotate: openDes ? '180deg' : '0deg'}]}}
              />
            </Box>
          </TouchableOpacity>
          <Collapsible collapsed={!openDes}>
            <Box width="100%" p={15}>
              <HtmlParseAndView
                rawHtml={data.description}
                htmlStyles={htmlStyles}
                // containerStyle={styles.container}
                // scrollRef={scrollRef.current}
                // eslint-disable-next-line react/jsx-props-no-spreading
                // {...htmlViewProps}
              />
            </Box>
          </Collapsible>
        </Box>
        {/* <Box
          style={{
            borderColor: colors.GAINSBORO,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setOpenAccept(!openAccept)}>
            <Box
              px={15}
              height={60}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text size={18} weight={TextWeight.BOLD}>
                Accepted venues
              </Text>
              <Icon
                name="chevron-down"
                size={15}
                color={colors.SECONDARY_TEXT}
                style={{transform: [{rotate: openAccept ? '180deg' : '0deg'}]}}
              />
            </Box>
          </TouchableOpacity>
          <Collapsible collapsed={!openAccept}>
            <Box p={15}></Box>
          </Collapsible>
        </Box> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VoucherDetail;
